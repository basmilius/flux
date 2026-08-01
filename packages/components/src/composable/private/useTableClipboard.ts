import { useEventListener } from '@basmilius/common';
import { type Ref, unref } from 'vue';
import { CELL_SELECTOR, getColumnSpan, getRowSpan, HEADER_SELECTOR, INTERACTIVE_SELECTOR, isVisibleRow, ROW_SELECTOR } from './useTableColumnIndex';

export type UseTableClipboardOptions = {
    getSelectedCells?(): ReadonlySet<HTMLElement>;

    getSelectedHeaders?(): HTMLElement[];
};

export type UseTableClipboardReturn = {
    copy(rows?: readonly HTMLElement[]): Promise<boolean>;
};

type CopiedCell = {
    readonly colspan: number;
    readonly isHeader: boolean;
    readonly rowspan: number;
    readonly value: string;
};

type CopiedRow = {
    readonly cells: CopiedCell[];
    readonly isFullWidth: boolean;
};

const ANY_CELL_SELECTOR = `${CELL_SELECTOR}, ${HEADER_SELECTOR}`;
const EXCLUDED_SELECTOR = '[data-flux-copy="none"]';
const VALUE_ATTRIBUTE = 'data-flux-copy-value';

function isExcluded(element: Element): boolean {
    return element.matches(EXCLUDED_SELECTOR);
}

function collapse(value: string): string {
    return value.replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function readValue(cell: HTMLElement): string {
    const value = cell.getAttribute(VALUE_ATTRIBUTE);

    if (value !== null) {
        return collapse(value);
    }

    // innerText is what a browser itself would copy: it honors line boxes and
    // leaves out anything the layout hides, such as a collapsed group's rows.
    if (!cell.querySelector(EXCLUDED_SELECTOR)) {
        return collapse(cell.innerText);
    }

    const walker = document.createTreeWalker(cell, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return NodeFilter.FILTER_ACCEPT;
            }

            const element = node as HTMLElement;

            return isExcluded(element) || element.style.display === 'none' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
    });

    const parts: string[] = [];

    while (walker.nextNode()) {
        if (walker.currentNode.nodeType === Node.TEXT_NODE) {
            parts.push(walker.currentNode.nodeValue ?? '');
        }
    }

    return collapse(parts.join(''));
}

function serializeRow(row: HTMLElement, isIncluded?: (cell: HTMLElement) => boolean): CopiedRow {
    const candidates = Array.from(row.children).filter(child => child.matches(ANY_CELL_SELECTOR) && !isExcluded(child)) as HTMLElement[];

    return {
        cells: candidates
            .filter(cell => !isIncluded || isIncluded(cell))
            .map(cell => ({
                colspan: getColumnSpan(cell),
                isHeader: cell.matches(HEADER_SELECTOR),
                rowspan: getRowSpan(cell),
                value: readValue(cell)
            })),
        isFullWidth: candidates.length === 1
    };
}

// A full-width row's own colspan counts the columns that were left out, so it is
// restated as the width actually being copied.
function normalize(rows: CopiedRow[]): CopiedRow[] {
    const width = Math.max(1, ...rows
        .filter(row => !row.isFullWidth)
        .map(row => row.cells.reduce((total, cell) => total + cell.colspan, 0)));

    return rows.map(row => row.isFullWidth ? {...row, cells: [{...row.cells[0], colspan: width}]} : row);
}

function collectRows(baseElement: HTMLElement): HTMLElement[] {
    return Array.from(baseElement.querySelectorAll<HTMLElement>(ROW_SELECTOR))
        .filter(row => !isExcluded(row) && isVisibleRow(row));
}

function serializeRows(rows: HTMLElement[], isIncluded?: (cell: HTMLElement) => boolean): CopiedRow[] {
    return normalize(rows
        .map(row => serializeRow(row, isIncluded))
        .filter(row => row.cells.length > 0));
}

function serializeSelectedCells(baseElement: HTMLElement, cells: ReadonlySet<HTMLElement>, headers: HTMLElement[]): CopiedRow[] {
    const rows = collectRows(baseElement).filter(row => Array.from(row.children).some(child => cells.has(child as HTMLElement)));
    const headerRow = headers[0]?.parentElement;

    if (headerRow) {
        rows.unshift(headerRow as HTMLElement);
    }

    return serializeRows(rows, cell => cells.has(cell) || headers.includes(cell));
}

function withHeaderRow(baseElement: HTMLElement, rows: readonly HTMLElement[]): HTMLElement[] {
    const visible = rows.filter(isVisibleRow);

    if (visible.some(row => row.querySelector(HEADER_SELECTOR))) {
        return visible;
    }

    const header = baseElement.querySelector<HTMLElement>(`${ROW_SELECTOR}:has(${HEADER_SELECTOR})`);

    return header ? [header, ...visible] : visible;
}

// Columns a rowspan above still occupies are filled with an empty value, so the
// row after a spanning cell keeps its values under the right headers.
function toText(rows: CopiedRow[]): string {
    const carry: number[] = [];

    return rows
        .map(({cells}) => {
            const columns: string[] = [];
            let index = 0;

            const take = (): void => {
                while (carry[index] > 0) {
                    carry[index]--;
                    columns[index] = '';
                    index++;
                }
            };

            for (const cell of cells) {
                take();

                for (let span = 0; span < cell.colspan; span++) {
                    columns[index] = span === 0 ? cell.value : '';
                    carry[index] = cell.rowspan - 1;
                    index++;
                }
            }

            take();

            return columns.join('\t');
        })
        .join('\n');
}

function toHtml(rows: CopiedRow[]): string {
    const markup = rows
        .map(({cells}) => {
            const columns = cells
                .map(cell => {
                    const tag = cell.isHeader ? 'th' : 'td';
                    const colspan = cell.colspan > 1 ? ` colspan="${cell.colspan}"` : '';
                    const rowspan = cell.rowspan > 1 ? ` rowspan="${cell.rowspan}"` : '';

                    return `<${tag}${colspan}${rowspan}>${escapeHtml(cell.value)}</${tag}>`;
                })
                .join('');

            return `<tr>${columns}</tr>`;
        })
        .join('');

    return `<table>${markup}</table>`;
}

async function write(rows: CopiedRow[]): Promise<boolean> {
    if (rows.length === 0 || !navigator.clipboard) {
        return false;
    }

    await navigator.clipboard.write([
        new ClipboardItem({
            'text/html': new Blob([toHtml(rows)], {type: 'text/html'}),
            'text/plain': new Blob([toText(rows)], {type: 'text/plain'})
        })
    ]);

    return true;
}

/**
 * Rebuilds the clipboard from the cells of a table. A grid of divs serializes as
 * one line per cell with nothing marking where a row ends, so a spreadsheet
 * receives a single column; both clipboard flavors are therefore written from the
 * table structure instead, tab separated and as real table markup.
 *
 * A cell states its own value with `data-flux-copy-value`. Anything carrying
 * `data-flux-copy="none"` is left out: a whole row or cell when the attribute sits
 * on it, and only that subtree's text when it sits inside a cell.
 */
export function useTableClipboard(base: Readonly<Ref<HTMLElement | null>>, options?: UseTableClipboardOptions): UseTableClipboardReturn {
    // A cell selection leaves the document selection empty, and a browser fires no
    // copy event when nothing is selected, so the shortcut is handled here.
    useEventListener(base, 'keydown', evt => {
        const target = evt.target as Element | null;

        if (!(evt.ctrlKey || evt.metaKey) || evt.key.toLowerCase() !== 'c' || target?.closest(INTERACTIVE_SELECTOR)) {
            return;
        }

        if (!options?.getSelectedCells?.().size) {
            return;
        }

        evt.preventDefault();
        void copy();
    });

    useEventListener(base, 'copy', evt => {
        const baseElement = unref(base);

        if (!baseElement || !evt.clipboardData) {
            return;
        }

        const cells = options?.getSelectedCells?.();

        if (cells?.size) {
            const selected = serializeSelectedCells(baseElement, cells, options?.getSelectedHeaders?.() ?? []);

            if (selected.length > 0) {
                evt.preventDefault();
                evt.clipboardData.setData('text/plain', toText(selected));
                evt.clipboardData.setData('text/html', toHtml(selected));
            }

            return;
        }

        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            return;
        }

        const range = selection.getRangeAt(0);
        const touched = collectRows(baseElement).filter(row => range.intersectsNode(row));

        if (touched.length === 0) {
            return;
        }

        // A drag ends halfway through its first and last row, so reaching a second
        // row is read as wanting those rows whole rather than as the cells it touched.
        const rows = touched.length > 1
            ? serializeRows(withHeaderRow(baseElement, touched))
            : normalize([serializeRow(touched[0], cell => range.intersectsNode(cell))]);

        if (rows.length === 0 || (rows.length === 1 && rows[0].cells.length < 2)) {
            return;
        }

        evt.preventDefault();
        evt.clipboardData.setData('text/plain', toText(rows));
        evt.clipboardData.setData('text/html', toHtml(rows));
    });

    async function copy(rows?: readonly HTMLElement[]): Promise<boolean> {
        const baseElement = unref(base);

        if (!baseElement) {
            return false;
        }

        const cells = rows ? undefined : options?.getSelectedCells?.();

        if (cells?.size) {
            return write(serializeSelectedCells(baseElement, cells, options?.getSelectedHeaders?.() ?? []));
        }

        return write(serializeRows(rows ? withHeaderRow(baseElement, rows) : collectRows(baseElement)));
    }

    return {copy};
}
