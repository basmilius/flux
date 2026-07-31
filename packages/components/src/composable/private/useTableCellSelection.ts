import { useEventListener } from '@basmilius/common';
import { isSSR } from '@flux-ui/internals';
import { computed, type Ref, ref, unref, useId, watch } from 'vue';
import { getColumnSpan } from './useTableColumnIndex';

export type UseTableCellSelectionReturn = {
    readonly activeCellId: Readonly<Ref<string | undefined>>;

    clear(): void;

    getSelectedCells(): ReadonlySet<HTMLElement>;
};

type GridCell = {
    readonly columnEnd: number;
    readonly columnStart: number;
    readonly element: HTMLElement;
    readonly rowEnd: number;
    readonly rowStart: number;
};

type Grid = {
    readonly at: ReadonlyMap<string, GridCell>;
    readonly columnCount: number;
    readonly positions: ReadonlyMap<HTMLElement, Position>;
    readonly rowCount: number;
};

type Position = {
    readonly column: number;
    readonly row: number;
};

const ACTIVE_ATTRIBUTE = 'data-flux-active';
const CELL_SELECTOR = '[role="cell"], [role="gridcell"]';
const INTERACTIVE_SELECTOR = 'a, button, input, label, select, textarea, [role="button"]';
const ROW_SELECTOR = '[role="row"]';
const SELECTED_ATTRIBUTE = 'data-flux-selected';

const EMPTY_GRID: Grid = {at: new Map(), columnCount: 0, positions: new Map(), rowCount: 0};

function toKey(row: number, column: number): string {
    return `${row}:${column}`;
}

function getRowSpan(element: Element): number {
    const span = Number.parseInt(element.getAttribute('aria-rowspan') ?? '', 10);

    return Number.isNaN(span) || span < 1 ? 1 : span;
}

// A row is display: contents, which has no layout box, and checkVisibility() calls
// anything without a box invisible. Only v-show hides a row, and that writes the
// inline style this reads.
function isVisibleRow(row: HTMLElement): boolean {
    return row.style.display !== 'none';
}

// Every column a cell covers maps back to that cell, so a spanning cell is reached
// from any of its columns and a cell below a rowspan resolves the column it really
// sits in rather than the one its sibling index suggests.
function buildGrid(container: HTMLElement | null): Grid {
    if (!container) {
        return EMPTY_GRID;
    }

    const rows = Array.from(container.querySelectorAll<HTMLElement>(ROW_SELECTOR)).filter(isVisibleRow);

    const at = new Map<string, GridCell>();
    const positions = new Map<HTMLElement, Position>();
    let columnCount = 0;

    rows.forEach((row, rowIndex) => {
        let column = 0;

        for (const child of row.children) {
            if (!child.matches(CELL_SELECTOR)) {
                continue;
            }

            while (at.has(toKey(rowIndex, column))) {
                column++;
            }

            const element = child as HTMLElement;
            const columnSpan = getColumnSpan(child);
            const cell: GridCell = {
                columnEnd: column + columnSpan,
                columnStart: column,
                element,
                rowEnd: rowIndex + getRowSpan(child),
                rowStart: rowIndex
            };

            for (let covered = cell.rowStart; covered < cell.rowEnd; covered++) {
                for (let span = cell.columnStart; span < cell.columnEnd; span++) {
                    at.set(toKey(covered, span), cell);
                }
            }

            positions.set(element, {column: cell.columnStart, row: cell.rowStart});
            column += columnSpan;
        }

        columnCount = Math.max(columnCount, column);
    });

    return {at, columnCount, positions, rowCount: rows.length};
}

/**
 * Spreadsheet-style cell selection over the table body: a rectangle of cells,
 * dragged with the pointer or walked with the arrow keys. The table itself is the
 * single tab stop and points at the active cell through `aria-activedescendant`,
 * which keeps a thousand-cell table to one focusable element.
 *
 * The selection is painted by setting attributes on the cells rather than by
 * rendering it, so extending it by one column touches the cells that changed
 * instead of patching every row through Vue.
 */
export function useTableCellSelection(grid: Readonly<Ref<HTMLElement | null>>, container: Readonly<Ref<HTMLElement | null>>, isEnabled: Readonly<Ref<boolean>>): UseTableCellSelectionReturn {
    const anchor = ref<Position | null>(null);
    const focus = ref<Position | null>(null);

    const activeCellId = ref<string | undefined>();
    const idPrefix = useId();

    let map = EMPTY_GRID;
    let painted = new Map<HTMLElement, string>();
    let activeCell: HTMLElement | null = null;
    let isDragging = false;
    let idCounter = 0;

    const range = computed(() => {
        const from = unref(anchor);
        const to = unref(focus);

        if (!from || !to) {
            return null;
        }

        return {
            columnEnd: Math.max(from.column, to.column),
            columnStart: Math.min(from.column, to.column),
            rowEnd: Math.max(from.row, to.row),
            rowStart: Math.min(from.row, to.row)
        };
    });

    // The value names the sides of the rectangle a cell sits on, so the outline is
    // drawn around the block as a whole rather than around every cell in it. A cell
    // that spans past an edge still holds that edge.
    function resolveCells(): Map<HTMLElement, string> {
        const bounds = unref(range);
        const cells = new Map<HTMLElement, string>();

        if (!bounds) {
            return cells;
        }

        for (let row = bounds.rowStart; row <= bounds.rowEnd; row++) {
            for (let column = bounds.columnStart; column <= bounds.columnEnd; column++) {
                const cell = map.at.get(toKey(row, column));

                if (!cell || cells.has(cell.element)) {
                    continue;
                }

                const edges: string[] = [];

                if (cell.rowStart <= bounds.rowStart) {
                    edges.push('top');
                }

                if (cell.rowEnd > bounds.rowEnd) {
                    edges.push('bottom');
                }

                if (cell.columnStart <= bounds.columnStart) {
                    edges.push('left');
                }

                if (cell.columnEnd > bounds.columnEnd) {
                    edges.push('right');
                }

                cells.set(cell.element, edges.join(' '));
            }
        }

        return cells;
    }

    function paint(): void {
        const cells = resolveCells();

        for (const element of painted.keys()) {
            if (!cells.has(element)) {
                element.removeAttribute(SELECTED_ATTRIBUTE);
                element.removeAttribute('aria-selected');
            }
        }

        for (const [element, edges] of cells) {
            if (painted.get(element) !== edges) {
                element.setAttribute(SELECTED_ATTRIBUTE, edges);
                element.setAttribute('aria-selected', 'true');
            }
        }

        painted = cells;
    }

    function markActive(position: Position | null): void {
        const cell = position ? map.at.get(toKey(position.row, position.column))?.element ?? null : null;

        if (cell === activeCell) {
            return;
        }

        activeCell?.removeAttribute(ACTIVE_ATTRIBUTE);
        activeCell = cell;

        if (!cell) {
            activeCellId.value = undefined;
            return;
        }

        if (!cell.id) {
            cell.id = `${idPrefix}-cell-${++idCounter}`;
        }

        cell.setAttribute(ACTIVE_ATTRIBUTE, '');
        activeCellId.value = cell.id;
        cell.scrollIntoView({block: 'nearest', inline: 'nearest'});
    }

    function clear(): void {
        anchor.value = null;
        focus.value = null;

        paint();
        markActive(null);
    }

    function select(position: Position, isExtending: boolean): void {
        if (!isExtending || !unref(anchor)) {
            anchor.value = position;
        }

        focus.value = position;

        paint();
        markActive(position);
    }

    function resolvePosition(target: Element | null): Position | null {
        const element = target?.closest(CELL_SELECTOR) as HTMLElement | null;

        return element ? map.positions.get(element) ?? null : null;
    }

    function moveBy(rowDelta: number, columnDelta: number, isExtending: boolean): void {
        const current = unref(focus) ?? unref(anchor);

        if (!current) {
            select({column: 0, row: 0}, false);
            return;
        }

        select({
            column: Math.min(Math.max(current.column + columnDelta, 0), Math.max(map.columnCount - 1, 0)),
            row: Math.min(Math.max(current.row + rowDelta, 0), Math.max(map.rowCount - 1, 0))
        }, isExtending);
    }

    function selectLastCell(isExtending: boolean): void {
        select({column: Math.max(map.columnCount - 1, 0), row: Math.max(map.rowCount - 1, 0)}, isExtending);
    }

    function onPointerDown(evt: PointerEvent): void {
        if (!unref(isEnabled) || evt.button !== 0) {
            return;
        }

        const target = evt.target as Element | null;

        if (target?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        map = buildGrid(unref(container));

        const position = resolvePosition(target);

        if (!position) {
            return;
        }

        // The table is the tab stop, so the pointer must not hand focus to a cell,
        // and must not start a text selection the cell rectangle would fight with.
        evt.preventDefault();

        const gridElement = unref(grid);

        // Before focusing: the focus handler below claims the first cell for a table
        // that is tabbed into, which this click is about to answer itself.
        isDragging = true;

        gridElement?.focus();
        gridElement?.setPointerCapture?.(evt.pointerId);

        select(position, evt.shiftKey);
    }

    function onPointerMove(evt: PointerEvent): void {
        if (!isDragging) {
            return;
        }

        const position = resolvePosition(document.elementFromPoint(evt.clientX, evt.clientY));

        if (position) {
            select(position, true);
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(isEnabled) || (evt.target as Element | null)?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        map = buildGrid(unref(container));

        const isModified = evt.ctrlKey || evt.metaKey;

        switch (evt.key) {
            case 'ArrowUp':
                moveBy(isModified ? -map.rowCount : -1, 0, evt.shiftKey);
                break;

            case 'ArrowDown':
                moveBy(isModified ? map.rowCount : 1, 0, evt.shiftKey);
                break;

            case 'ArrowLeft':
                moveBy(0, isModified ? -map.columnCount : -1, evt.shiftKey);
                break;

            case 'ArrowRight':
                moveBy(0, isModified ? map.columnCount : 1, evt.shiftKey);
                break;

            case 'Home':
                if (isModified) {
                    select({column: 0, row: 0}, evt.shiftKey);
                } else {
                    moveBy(0, -map.columnCount, evt.shiftKey);
                }
                break;

            case 'End':
                if (isModified) {
                    selectLastCell(evt.shiftKey);
                } else {
                    moveBy(0, map.columnCount, evt.shiftKey);
                }
                break;

            case 'a':
            case 'A':
                if (!isModified) {
                    return;
                }

                anchor.value = {column: 0, row: 0};
                selectLastCell(true);
                break;

            case 'Escape':
                clear();
                break;

            default:
                return;
        }

        evt.preventDefault();
    }

    // Tabbing into the table has to land somewhere visible, and a grid says where it
    // is through aria-activedescendant, which needs a cell to point at.
    useEventListener(grid, 'focus', () => {
        if (!unref(isEnabled) || isDragging || unref(focus)) {
            return;
        }

        map = buildGrid(unref(container));
        select({column: 0, row: 0}, false);
    });

    // On click rather than pointerdown, and without capture, so a copy button of the
    // consumer's own runs its handler first: it reads the selection synchronously,
    // and only then is the selection dropped.
    useEventListener(() => isSSR ? null : document, 'click', evt => {
        const gridElement = unref(grid);

        if (!unref(isEnabled) || !unref(focus) || !gridElement || gridElement.contains(evt.target as Node)) {
            return;
        }

        clear();
    });

    useEventListener(grid, 'pointerdown', onPointerDown);
    useEventListener(grid, 'pointermove', onPointerMove);
    useEventListener(grid, 'keydown', onKeyDown);
    useEventListener(grid, 'lostpointercapture', () => {
        isDragging = false;
    });

    watch(isEnabled, enabled => {
        if (!enabled) {
            clear();
        }
    });

    return {
        activeCellId,
        clear,

        getSelectedCells: () => new Set(painted.keys())
    };
}
