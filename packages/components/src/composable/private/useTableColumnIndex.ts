import { computed, type ComputedRef, type Ref, unref } from 'vue';
import type { FluxTableColumnDef } from '~flux/components/data';

/**
 * Returns how many columns a cell occupies. `aria-colspan` is the single place
 * in the DOM that carries this, for assistive technology and for the column
 * bookkeeping alike.
 */
export function getColumnSpan(element: Element): number {
    const span = Number.parseInt(element.getAttribute('aria-colspan') ?? '', 10);

    return Number.isNaN(span) || span < 1 ? 1 : span;
}

/**
 * Counts the columns a row covers, spans included.
 */
export function countColumns(row: Element | null | undefined): number {
    let count = 0;

    for (const cell of row?.children ?? []) {
        count += getColumnSpan(cell);
    }

    return count;
}

/**
 * Resolves the column a cell starts in by accumulating the spans of the cells
 * before it. Its sibling index would be one place to the left for every cell
 * that follows a spanning one, taking pinning and column formatting with it.
 */
export function resolveColumnIndex(element: Element | null | undefined): number {
    const parent = element?.parentElement;

    if (!parent) {
        return -1;
    }

    let index = 0;

    for (const sibling of parent.children) {
        if (sibling === element) {
            return index;
        }

        index += getColumnSpan(sibling);
    }

    return -1;
}

/**
 * Tracks the column a cell or header starts in. The columns are read purely to
 * re-resolve the index once they change: that is the render pass in which the
 * table settles into its final shape.
 */
export function useTableColumnIndex(element: Readonly<Ref<HTMLElement | null>>, columns: Readonly<Ref<readonly FluxTableColumnDef[]>>): ComputedRef<number> {
    return computed(() => {
        void columns.value;

        return resolveColumnIndex(unref(element));
    });
}
