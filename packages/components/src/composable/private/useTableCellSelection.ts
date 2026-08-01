import { useEventListener, useMutationObserver } from '@basmilius/common';
import { clamp } from '@basmilius/utils';
import { isSSR } from '@flux-ui/internals';
import { type Ref, ref, unref, useId, watch } from 'vue';
import { CELL_SELECTOR, getColumnSpan, getRowSpan, HEADER_SELECTOR, INTERACTIVE_SELECTOR, isVisibleRow, ROW_SELECTOR } from './useTableColumnIndex';

export type UseTableCellSelectionReturn = {
    readonly activeCellId: Readonly<Ref<string | undefined>>;

    clear(): void;

    getSelectedCells(): ReadonlySet<HTMLElement>;

    getSelectedHeaders(): HTMLElement[];
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
    readonly firstDataRow: number;
    readonly positions: ReadonlyMap<HTMLElement, Position>;
    readonly rowCount: number;
};

type Position = {
    readonly column: number;
    readonly row: number;
};

const ACTIVE_ATTRIBUTE = 'data-flux-active';
const ANY_CELL_SELECTOR = `${CELL_SELECTOR}, ${HEADER_SELECTOR}`;
const EXCLUDED_SELECTOR = '[data-flux-copy="none"]';
const SELECTED_ATTRIBUTE = 'data-flux-selected';

const EMPTY_GRID: Grid = {at: new Map(), columnCount: 0, firstDataRow: 0, positions: new Map(), rowCount: 0};

function toKey(row: number, column: number): string {
    return `${row}:${column}`;
}

// The header row is row 0 of the grid, which is what makes a click on a header
// mean "this column, header included" rather than a case of its own.
function buildGrid(container: HTMLElement | null): Grid {
    if (!container) {
        return EMPTY_GRID;
    }

    const rows = Array.from(container.querySelectorAll<HTMLElement>(ROW_SELECTOR))
        .filter(row => isVisibleRow(row) && !row.matches(EXCLUDED_SELECTOR));

    const at = new Map<string, GridCell>();
    const positions = new Map<HTMLElement, Position>();
    let columnCount = 0;
    let firstDataRow = 0;

    rows.forEach((row, rowIndex) => {
        let column = 0;

        if (row.querySelector(HEADER_SELECTOR)) {
            firstDataRow = rowIndex + 1;
        }

        for (const child of row.children) {
            if (!child.matches(ANY_CELL_SELECTOR) || child.matches(EXCLUDED_SELECTOR)) {
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

    return {at, columnCount, firstDataRow, positions, rowCount: rows.length};
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
export function useTableCellSelection(grid: Readonly<Ref<HTMLElement | null>>, isEnabled: Readonly<Ref<boolean>>): UseTableCellSelectionReturn {
    const activeCellId = ref<string | undefined>();
    const idPrefix = useId();

    let map = EMPTY_GRID;
    let isMapStale = true;
    let anchor: Position | null = null;
    let focus: Position | null = null;
    let painted = new Map<HTMLElement, string>();
    let activeCell: HTMLElement | null = null;
    let isDragging = false;
    let isColumnDrag = false;
    let idCounter = 0;

    function refresh(): void {
        if (isMapStale) {
            map = buildGrid(unref(grid));
            isMapStale = false;
        }
    }

    function resolveCells(): Map<HTMLElement, string> {
        const cells = new Map<HTMLElement, string>();

        if (!anchor || !focus) {
            return cells;
        }

        const columnEnd = Math.max(anchor.column, focus.column);
        const columnStart = Math.min(anchor.column, focus.column);
        const rowEnd = Math.max(anchor.row, focus.row);
        const rowStart = Math.min(anchor.row, focus.row);

        for (let row = rowStart; row <= rowEnd; row++) {
            for (let column = columnStart; column <= columnEnd; column++) {
                const cell = map.at.get(toKey(row, column));

                if (!cell || cells.has(cell.element)) {
                    continue;
                }

                const edges: string[] = [];

                if (cell.rowStart <= rowStart) {
                    edges.push('top');
                }

                if (cell.rowEnd > rowEnd) {
                    edges.push('bottom');
                }

                if (cell.columnStart <= columnStart) {
                    edges.push('left');
                }

                if (cell.columnEnd > columnEnd) {
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

        if (!isDragging) {
            cell.scrollIntoView({block: 'nearest', inline: 'nearest'});
        }
    }

    function clear(): void {
        anchor = null;
        focus = null;

        paint();
        markActive(null);
    }

    function select(position: Position, isExtending: boolean): void {
        if (!isExtending || !anchor) {
            anchor = position;
        }

        focus = position;

        paint();
        markActive(position);
    }

    function resolvePosition(target: Element | null): Position | null {
        const element = target?.closest(ANY_CELL_SELECTOR) as HTMLElement | null;

        return element ? map.positions.get(element) ?? null : null;
    }

    function moveBy(rowDelta: number, columnDelta: number, isExtending: boolean): void {
        const current = focus ?? anchor;

        if (!current) {
            select({column: 0, row: 0}, false);
            return;
        }

        select({
            column: clamp(current.column + columnDelta, 0, Math.max(map.columnCount - 1, 0)),
            row: clamp(current.row + rowDelta, 0, Math.max(map.rowCount - 1, 0))
        }, isExtending);
    }

    function selectLastCell(isExtending: boolean): void {
        select({column: Math.max(map.columnCount - 1, 0), row: Math.max(map.rowCount - 1, 0)}, isExtending);
    }

    // A header claims its whole column, itself included, so the block a spreadsheet
    // gives you for a column click is the block that gets copied.
    function selectColumn(column: number, isExtending: boolean): void {
        anchor = {column: isExtending && anchor ? anchor.column : column, row: 0};
        focus = {column, row: Math.max(map.rowCount - 1, 0)};

        paint();
        markActive({column, row: 0});
    }

    function onPointerDown(evt: PointerEvent): void {
        if (!unref(isEnabled) || evt.button !== 0) {
            return;
        }

        const target = evt.target as Element | null;

        if (target?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        refresh();

        const position = resolvePosition(target);

        if (!position) {
            return;
        }

        // Before focusing: the focus handler claims the first cell for a table that
        // is tabbed into, which this click is about to answer itself.
        isDragging = true;

        const gridElement = unref(grid);

        gridElement?.focus();
        gridElement?.setPointerCapture?.(evt.pointerId);

        // The table is the tab stop, so the pointer must not hand focus to a cell,
        // and must not start a text selection the cell rectangle would fight with.
        evt.preventDefault();

        isColumnDrag = !!target?.closest(HEADER_SELECTOR);

        if (isColumnDrag) {
            selectColumn(position.column, evt.shiftKey);
        } else {
            select(position, evt.shiftKey);
        }
    }

    function onPointerMove(evt: PointerEvent): void {
        if (!isDragging) {
            return;
        }

        const position = resolvePosition(document.elementFromPoint(evt.clientX, evt.clientY));

        if (!position) {
            return;
        }

        if (isColumnDrag) {
            selectColumn(position.column, true);
        } else {
            select(position, true);
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (!unref(isEnabled) || (evt.target as Element | null)?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        const isModified = evt.ctrlKey || evt.metaKey;

        if (evt.key === 'Escape') {
            evt.preventDefault();
            clear();
            return;
        }

        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evt.key) && !(isModified && evt.key.toLowerCase() === 'a')) {
            return;
        }

        refresh();

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

            default:
                anchor = {column: 0, row: 0};
                selectLastCell(true);
                break;
        }

        evt.preventDefault();
    }

    function holdsRow(nodes: NodeList): boolean {
        return Array.from(nodes).some(node => node instanceof HTMLElement && (node.matches(ROW_SELECTOR) || !!node.querySelector(ROW_SELECTOR)));
    }

    // Rows the table replaces leave the selection holding detached elements, which
    // would copy nothing and point aria-activedescendant at an id that is gone. Only
    // rows count: a cell rerendering its own text leaves the map intact.
    useMutationObserver(grid, mutations => {
        if (!mutations.some(mutation => holdsRow(mutation.addedNodes) || holdsRow(mutation.removedNodes))) {
            return;
        }

        isMapStale = true;

        if (anchor) {
            clear();
        }
    }, {childList: true, subtree: true});

    // On click rather than pointerdown, and without capture, so a copy button of the
    // consumer's own runs its handler first: it reads the selection synchronously,
    // and only then is the selection dropped.
    useEventListener(() => isSSR ? null : document, 'click', evt => {
        const gridElement = unref(grid);

        if (!unref(isEnabled) || !focus || !gridElement || gridElement.contains(evt.target as Node)) {
            return;
        }

        clear();
    });

    // Tabbing into the table has to land somewhere visible, and a grid says where it
    // is through aria-activedescendant, which needs a cell to point at.
    useEventListener(grid, 'focus', () => {
        if (!unref(isEnabled) || isDragging || focus) {
            return;
        }

        refresh();
        select({column: 0, row: map.firstDataRow}, false);
    });

    useEventListener(grid, 'pointerdown', onPointerDown);
    useEventListener(grid, 'pointermove', onPointerMove);
    useEventListener(grid, 'keydown', onKeyDown);
    useEventListener(grid, ['lostpointercapture', 'pointerup', 'pointercancel'], () => {
        isDragging = false;
    });

    watch(isEnabled, enabled => {
        if (!enabled) {
            clear();
        }
    });

    // A rectangle taken from the body pastes as anonymous values, so the columns it
    // covers hand over their headers too. Not when the selection holds them already,
    // and not within a single row, which mirrors what a text selection copies.
    function getSelectedHeaders(): HTMLElement[] {
        if (!anchor || !focus) {
            return [];
        }

        const rowStart = Math.min(anchor.row, focus.row);

        if (rowStart < map.firstDataRow || rowStart === Math.max(anchor.row, focus.row)) {
            return [];
        }

        const headers: HTMLElement[] = [];

        for (let column = Math.min(anchor.column, focus.column); column <= Math.max(anchor.column, focus.column); column++) {
            const header = map.at.get(toKey(0, column))?.element;

            if (header?.matches(HEADER_SELECTOR) && !headers.includes(header)) {
                headers.push(header);
            }
        }

        return headers;
    }

    return {
        activeCellId,
        clear,
        getSelectedHeaders,

        getSelectedCells: () => new Set(painted.keys())
    };
}
