import { useEventListener } from '@basmilius/common';
import { type Ref, unref } from 'vue';
import { getColumnSpan } from './useTableColumnIndex';

export type UseTableClipboardReturn = {
    copy(rows?: readonly HTMLElement[]): Promise<boolean>;
};

type CopiedCell = {
    readonly colspan: number;
    readonly isFullWidth: boolean;
    readonly isHeader: boolean;
    readonly rowspan: number;
    readonly value: string;
};

const CELL_SELECTOR = '[role="cell"], [role="columnheader"]';
const EXCLUDED_SELECTOR = '[data-flux-copy="none"]';
const HEADER_SELECTOR = '[role="columnheader"]';
const ROW_SELECTOR = '[role="row"]';
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

function getRowSpan(element: Element): number {
    const span = Number.parseInt(element.getAttribute('aria-rowspan') ?? '', 10);

    return Number.isNaN(span) || span < 1 ? 1 : span;
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
        acceptNode: node => node.nodeType === Node.ELEMENT_NODE && isExcluded(node as Element) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });

    const parts: string[] = [];

    while (walker.nextNode()) {
        if (walker.currentNode.nodeType === Node.TEXT_NODE) {
            parts.push(walker.currentNode.nodeValue ?? '');
        }
    }

    return collapse(parts.join(''));
}

function serializeRow(row: HTMLElement, isIncluded?: (cell: HTMLElement) => boolean): CopiedCell[] {
    const candidates = Array.from(row.children).filter(child => child.matches(CELL_SELECTOR) && !isExcluded(child)) as HTMLElement[];
    const isFullWidth = candidates.length === 1;

    return candidates
        .filter(cell => !isIncluded || isIncluded(cell))
        .map(cell => ({
            colspan: getColumnSpan(cell),
            isFullWidth,
            isHeader: cell.matches(HEADER_SELECTOR),
            rowspan: getRowSpan(cell),
            value: readValue(cell)
        }));
}

// A row of one cell spans the table: a group header, a section row, an expanded
// row's detail. Its own colspan counts the columns that were left out, so it is
// restated as the width that is actually being copied.
function normalize(rows: CopiedCell[][]): CopiedCell[][] {
    const widths = rows
        .filter(cells => !isFullWidthRow(cells))
        .map(cells => cells.reduce((total, cell) => total + cell.colspan, 0));

    const width = Math.max(1, ...widths);

    return rows.map(cells => isFullWidthRow(cells) ? [{...cells[0], colspan: width}] : cells);
}

function isFullWidthRow(cells: CopiedCell[]): boolean {
    return cells.length === 1 && cells[0].isFullWidth;
}

function serializeRows(rows: HTMLElement[], isIncluded?: (cell: HTMLElement) => boolean): CopiedCell[][] {
    return normalize(rows
        .map(row => serializeRow(row, isIncluded))
        .filter(cells => cells.length > 0));
}

function collectRows(baseElement: HTMLElement): HTMLElement[] {
    return Array.from(baseElement.querySelectorAll<HTMLElement>(ROW_SELECTOR))
        .filter(row => !isExcluded(row) && (row.checkVisibility?.() ?? true));
}

// Rows pasted without their column names land in a spreadsheet as anonymous
// values, so whole rows are copied with the header row in front of them.
function withHeaderRow(baseElement: HTMLElement, rows: readonly HTMLElement[]): HTMLElement[] {
    if (rows.some(row => row.querySelector(HEADER_SELECTOR))) {
        return Array.from(rows);
    }

    const header = baseElement.querySelector<HTMLElement>(`${ROW_SELECTOR}:has(${HEADER_SELECTOR})`);

    return header ? [header, ...rows] : Array.from(rows);
}

function toText(rows: CopiedCell[][]): string {
    return rows
        .map(cells => cells
            .flatMap(cell => [cell.value, ...Array.from({length: cell.colspan - 1}, () => '')])
            .join('\t'))
        .join('\n');
}

function toHtml(rows: CopiedCell[][]): string {
    const markup = rows
        .map(cells => {
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

async function write(rows: CopiedCell[][]): Promise<boolean> {
    if (rows.length === 0) {
        return false;
    }

    const text = toText(rows);

    if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
        if (!navigator.clipboard?.writeText) {
            return false;
        }

        await navigator.clipboard.writeText(text);

        return true;
    }

    await navigator.clipboard.write([
        new ClipboardItem({
            'text/html': new Blob([toHtml(rows)], {type: 'text/html'}),
            'text/plain': new Blob([text], {type: 'text/plain'})
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
 * A cell states its own value with `data-flux-copy-value`, which is what lets a
 * formatted date or amount paste as the value behind it. Anything carrying
 * `data-flux-copy="none"` is left out: a whole row or cell when the attribute
 * sits on it, and only that subtree's text when it sits inside a cell.
 */
export function useTableClipboard(base: Readonly<Ref<HTMLElement | null>>): UseTableClipboardReturn {
    useEventListener(base, 'copy', evt => {
        const baseElement = unref(base);
        const selection = window.getSelection();

        if (!baseElement || !evt.clipboardData || !selection || selection.rangeCount === 0 || selection.isCollapsed) {
            return;
        }

        const range = selection.getRangeAt(0);
        const touched = collectRows(baseElement).filter(row => range.intersectsNode(row));

        if (touched.length === 0) {
            return;
        }

        // A drag ends halfway through its first and last row, which would copy those
        // two rows short of the ones in between. Reaching a second row is therefore
        // read as wanting those rows whole, column headers included; staying within
        // one row keeps to the cells that were dragged over, and staying within one
        // cell is an ordinary text copy that is left alone.
        const rows = touched.length > 1
            ? serializeRows(withHeaderRow(baseElement, touched))
            : normalize([serializeRow(touched[0], cell => range.intersectsNode(cell))]);

        if (rows.length === 0 || (rows.length === 1 && rows[0].length < 2)) {
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

        const elements = rows ? withHeaderRow(baseElement, rows) : collectRows(baseElement);

        return write(serializeRows(elements));
    }

    return {copy};
}
