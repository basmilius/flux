import type {FluxKanbanKeyboardDirection} from './kanbanEngine';

export type FluxKanbanSwimlaneTarget = {cellId: string; beforeItemId: string | number | null};
const CELL_ATTRIBUTE = 'data-kanban-cell';
const COLUMN_ATTRIBUTE = 'data-kanban-column';
const ITEM_SELECTOR = '[data-kanban-item]';
const SWIMLANE_SELECTOR = '[data-kanban-swimlane]';
const SWIMLANE_COLLAPSED_SELECTOR = '[data-kanban-swimlane-collapsed]';
export const KANBAN_CELL_SELECTOR = `[${CELL_ATTRIBUTE}]`;

export function toKanbanCellId(columnId: string | number, swimlaneId: string | number | undefined): string | number {
    return swimlaneId === undefined ? columnId : `${String(columnId)} / ${String(swimlaneId)}`;
}

/**
 * Resolves the cell and insert position an arrow key should move a card to.
 * Left and right walk the columns of the current swimlane, up and down walk the
 * cards of the current cell and continue into the neighboring swimlane.
 */
export function findKanbanSwimlaneTarget(
    itemElement: Element,
    direction: FluxKanbanKeyboardDirection,
    getItemId: (element: Element) => string | number | undefined
): FluxKanbanSwimlaneTarget | null {
    const cell = itemElement.closest(KANBAN_CELL_SELECTOR);
    const swimlane = cell?.parentElement;

    if (!cell || !swimlane || !swimlane.matches(SWIMLANE_SELECTOR)) {
        return null;
    }

    if (direction === 'left' || direction === 'right') {
        const cells = getSwimlaneCells(swimlane);
        const target = cells[cells.indexOf(cell) + (direction === 'left' ? -1 : 1)];

        return target ? toTarget(target, 'start', getItemId) : null;
    }

    const items = getCellItems(cell, getItemId);
    const index = items.findIndex(item => item.element === itemElement);
    const targetIndex = index + (direction === 'up' ? -1 : 1);
    const cellId = cell.getAttribute(CELL_ATTRIBUTE);

    if (cellId !== null && index !== -1 && targetIndex >= 0 && targetIndex < items.length) {
        return {
            cellId,
            beforeItemId: direction === 'up' ? items[targetIndex].itemId : items[targetIndex + 1]?.itemId ?? null
        };
    }

    const target = findCellInSiblingSwimlane(swimlane, cell, direction);

    return target ? toTarget(target, direction === 'up' ? 'end' : 'start', getItemId) : null;
}

function toTarget(
    cell: Element,
    position: 'start' | 'end',
    getItemId: (element: Element) => string | number | undefined
): FluxKanbanSwimlaneTarget | null {
    const cellId = cell.getAttribute(CELL_ATTRIBUTE);

    if (cellId === null) {
        return null;
    }

    return {
        cellId,
        beforeItemId: position === 'end' ? null : getCellItems(cell, getItemId)[0]?.itemId ?? null
    };
}

function getSwimlaneCells(swimlane: Element): Element[] {
    return Array.from(swimlane.children).filter(child => child.matches(KANBAN_CELL_SELECTOR));
}

function getCellItems(
    cell: Element,
    getItemId: (element: Element) => string | number | undefined
): { readonly element: Element; readonly itemId: string | number }[] {
    return Array.from(cell.querySelectorAll(ITEM_SELECTOR))
        .map(element => ({element, itemId: getItemId(element)}))
        .filter((entry): entry is { element: Element; itemId: string | number } => entry.itemId !== undefined);
}

function findCellInSiblingSwimlane(swimlane: Element, cell: Element, direction: 'up' | 'down'): Element | null {
    const columnId = cell.getAttribute(COLUMN_ATTRIBUTE);
    const key = direction === 'up' ? 'previousElementSibling' : 'nextElementSibling';

    let sibling = swimlane[key];

    while (sibling) {
        if (sibling.matches(SWIMLANE_SELECTOR) && !sibling.matches(SWIMLANE_COLLAPSED_SELECTOR)) {
            const target = getSwimlaneCells(sibling).find(candidate => candidate.getAttribute(COLUMN_ATTRIBUTE) === columnId);

            if (target) {
                return target;
            }
        }

        sibling = sibling[key];
    }

    return null;
}
