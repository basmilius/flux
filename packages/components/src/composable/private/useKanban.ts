import type { FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent } from '@flux-ui/types';
import { computed, ref, type Ref, unref } from 'vue';
import type { FluxKanbanColumnDragState, FluxKanbanDragState, FluxKanbanInjection, FluxKanbanKeyboardDirection } from '~flux/components/data';
import { useKanbanAutoScroll } from './useKanbanAutoScroll';

export type UseKanbanOptions = {
    readonly disabled: Ref<boolean>;
    readonly reorderableColumns: Ref<boolean>;
    readonly canMove?: Ref<((event: FluxKanbanMoveEvent) => boolean) | undefined>;
    readonly onMove: (event: FluxKanbanMoveEvent) => void;
    readonly onMoveColumn: (event: FluxKanbanMoveColumnEvent) => void;
    readonly onAnnounce: (message: string) => void;
};

const DRAG_LEAVE_GRACE_MS = 50;

const WITHIN_COLUMN_DELTA: Record<'up' | 'down', -1 | 1> = {up: -1, down: 1};
const ACROSS_COLUMN_DELTA: Record<'left' | 'right', -1 | 1> = {left: -1, right: 1};

/**
 * Internal composable for managing kanban drag-and-drop state.
 * Provides item registration, drag tracking, drop target management,
 * keyboard drag-and-drop, column reordering, drop validation and auto-scroll.
 */
export function useKanban(options: UseKanbanOptions): FluxKanbanInjection {
    const dragState = ref<FluxKanbanDragState | null>(null);
    const columnDragState = ref<FluxKanbanColumnDragState | null>(null);
    const isOverColumnId = ref<string | number | null>(null);

    const itemRegistry = new WeakMap<Element, { readonly itemId: string | number }>();
    const itemElementsById = new Map<string | number, Element>();
    const columnRegistry = new WeakMap<Element, { readonly columnId: string | number }>();
    const columnElementsById = new Map<string | number, Element>();
    const columnBodyById = new Map<string | number, Element>();
    const dragEnterCounts = new Map<string | number, number>();

    let boardElement: Element | null = null;
    let clearTimer: ReturnType<typeof setTimeout> | null = null;

    const autoScroll = useKanbanAutoScroll({
        getBoardElement: () => boardElement,
        getVerticalTarget: () => {
            const state = unref(dragState);
            return state && state.dropColumnId !== null ? columnBodyById.get(state.dropColumnId) ?? null : null;
        }
    });

    const grabbedId = computed<string | number | null>(() => {
        const state = unref(dragState);
        return state !== null && state.mode === 'keyboard' ? state.itemId : null;
    });

    const currentMoveEvent = computed<FluxKanbanMoveEvent | null>(() => tryBuildMoveEvent(unref(dragState)));

    const isDropAllowed = computed(() => {
        const event = unref(currentMoveEvent);
        return event === null || validateMove(event);
    });

    function tryBuildMoveEvent(state: FluxKanbanDragState | null): FluxKanbanMoveEvent | null {
        if (!state || state.dropColumnId === null) {
            return null;
        }

        return {
            itemId: state.itemId,
            fromColumnId: state.fromColumnId,
            toColumnId: state.dropColumnId,
            beforeItemId: state.beforeItemId ?? undefined
        };
    }

    function validateMove(event: FluxKanbanMoveEvent): boolean {
        const validate = unref(options.canMove);
        return validate ? validate(event) : true;
    }

    function clearTimerIfAny(): void {
        if (clearTimer !== null) {
            clearTimeout(clearTimer);
            clearTimer = null;
        }
    }

    function isSelfDrop(state: FluxKanbanDragState): boolean {
        return state.fromColumnId === state.dropColumnId
            && state.beforeItemId === (state.originBeforeItemId ?? null);
    }

    function getColumnIndex(columnId: string | number): number {
        if (!boardElement) {
            return -1;
        }

        const columns = Array.from(boardElement.children).filter(child => columnRegistry.has(child));
        return columns.findIndex(elm => columnRegistry.get(elm)?.columnId === columnId);
    }

    function getColumnByIndex(index: number): { readonly columnId: string | number } | null {
        if (!boardElement) {
            return null;
        }

        const columns = Array.from(boardElement.children).filter(child => columnRegistry.has(child));
        const elm = columns[index];

        return elm ? columnRegistry.get(elm)! : null;
    }

    function getItemsInColumn(columnId: string | number): (string | number)[] {
        const body = columnBodyById.get(columnId);

        if (!body) {
            return [];
        }

        return Array.from(body.children)
            .map(child => itemRegistry.get(child)?.itemId)
            .filter((id): id is string | number => id !== undefined);
    }

    function registerItem(element: Element, itemId: string | number): void {
        itemRegistry.set(element, {itemId});
        itemElementsById.set(itemId, element);
    }

    function unregisterItem(element: Element): void {
        const info = itemRegistry.get(element);

        if (info) {
            itemElementsById.delete(info.itemId);
        }

        itemRegistry.delete(element);
    }

    function getItemInfo(element: Element): { readonly itemId: string | number } | undefined {
        return itemRegistry.get(element);
    }

    function registerColumn(element: Element, columnId: string | number): void {
        columnRegistry.set(element, {columnId});
        columnElementsById.set(columnId, element);
    }

    function unregisterColumn(element: Element): void {
        const info = columnRegistry.get(element);

        if (info) {
            columnElementsById.delete(info.columnId);
            columnBodyById.delete(info.columnId);
            dragEnterCounts.delete(info.columnId);

            if (isOverColumnId.value === info.columnId) {
                isOverColumnId.value = null;
            }
        }

        columnRegistry.delete(element);
    }

    function getColumnInfo(element: Element): { readonly columnId: string | number } | undefined {
        return columnRegistry.get(element);
    }

    function setBoardElement(element: Element | null): void {
        boardElement = element;
    }

    function setColumnBodyElement(columnId: string | number, element: Element | null): void {
        if (element) {
            columnBodyById.set(columnId, element);
        } else {
            columnBodyById.delete(columnId);
        }
    }

    function enterColumn(columnId: string | number): void {
        if (unref(options.disabled)) {
            return;
        }

        const count = (dragEnterCounts.get(columnId) ?? 0) + 1;
        dragEnterCounts.set(columnId, count);
        isOverColumnId.value = columnId;
    }

    function leaveColumn(columnId: string | number): void {
        const next = (dragEnterCounts.get(columnId) ?? 0) - 1;

        if (next > 0) {
            dragEnterCounts.set(columnId, next);
            return;
        }

        dragEnterCounts.delete(columnId);

        if (isOverColumnId.value === columnId) {
            isOverColumnId.value = null;
        }

        clearDropTarget();
    }

    function startDrag(itemId: string | number, fromColumnId: string | number): void {
        if (unref(options.disabled)) {
            return;
        }

        clearTimerIfAny();
        dragState.value = {
            mode: 'pointer',
            itemId,
            fromColumnId,
            dropColumnId: null,
            beforeItemId: null,
            originBeforeItemId: findCurrentBeforeItemId(itemId, fromColumnId)
        };
    }

    function endDrag(): void {
        clearTimerIfAny();
        autoScroll.stop();
        dragState.value = null;
        isOverColumnId.value = null;
        dragEnterCounts.clear();
    }

    function updateDropTarget(columnId: string | number, beforeItemId: string | number | null): void {
        if (!dragState.value) {
            return;
        }

        clearTimerIfAny();
        dragState.value = {...dragState.value, dropColumnId: columnId, beforeItemId};
    }

    function clearDropTarget(): void {
        if (!dragState.value) {
            return;
        }

        clearTimerIfAny();
        clearTimer = setTimeout(() => {
            clearTimer = null;

            if (!dragState.value) {
                return;
            }

            dragState.value = {...dragState.value, dropColumnId: null, beforeItemId: null};
        }, DRAG_LEAVE_GRACE_MS);
    }

    function commitDrop(): void {
        const state = dragState.value;
        const event = tryBuildMoveEvent(state);
        endDrag();

        if (!event || !state || isSelfDrop(state)) {
            return;
        }

        if (!validateMove(event)) {
            options.onAnnounce('Drop not allowed.');
            return;
        }

        options.onMove(event);
        options.onAnnounce(`Item moved to ${String(event.toColumnId)}.`);
    }

    /* region keyboard */

    function findCurrentColumnId(itemId: string | number): string | number | null {
        for (const columnId of columnElementsById.keys()) {
            if (getItemsInColumn(columnId).includes(itemId)) {
                return columnId;
            }
        }

        return null;
    }

    function findCurrentBeforeItemId(itemId: string | number, columnId: string | number): string | number | null {
        const items = getItemsInColumn(columnId);
        const idx = items.indexOf(itemId);

        if (idx === -1) {
            return null;
        }

        return items[idx + 1] ?? null;
    }

    function grabItem(itemId: string | number, fromColumnId: string | number): void {
        if (unref(options.disabled)) {
            return;
        }

        clearTimerIfAny();

        dragState.value = {
            mode: 'keyboard',
            itemId,
            fromColumnId,
            dropColumnId: null,
            beforeItemId: null,
            originBeforeItemId: findCurrentBeforeItemId(itemId, fromColumnId)
        };
        options.onAnnounce('Item grabbed. Use arrow keys to move, Enter to drop, Escape to cancel.');
    }

    function moveKeyboard(direction: FluxKanbanKeyboardDirection): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const itemId = state.itemId;
        const currentColumnId = findCurrentColumnId(itemId);

        if (currentColumnId === null) {
            return;
        }

        const target = direction === 'up' || direction === 'down'
            ? computeWithinColumnTarget(itemId, currentColumnId, direction)
            : computeAcrossColumnTarget(currentColumnId, direction);

        if (!target) {
            return;
        }

        const event: FluxKanbanMoveEvent = {
            itemId,
            fromColumnId: currentColumnId,
            toColumnId: target.columnId,
            beforeItemId: target.beforeItemId ?? undefined
        };

        if (!validateMove(event)) {
            options.onAnnounce('Move not allowed.');
            return;
        }

        options.onMove(event);
        options.onAnnounce(target.announcement);
        restoreItemFocus(itemId);
    }

    function restoreItemFocus(itemId: string | number): void {
        requestAnimationFrame(() => {
            const elm = itemElementsById.get(itemId);

            if (elm instanceof HTMLElement) {
                elm.focus();
            }
        });
    }

    function computeWithinColumnTarget(
        itemId: string | number,
        columnId: string | number,
        direction: 'up' | 'down'
    ): { columnId: string | number; beforeItemId: string | number | null; announcement: string } | null {
        const items = getItemsInColumn(columnId);
        const idx = items.indexOf(itemId);

        if (idx === -1) {
            return null;
        }

        const targetIdx = idx + WITHIN_COLUMN_DELTA[direction];

        if (targetIdx < 0 || targetIdx >= items.length) {
            return null;
        }

        // For "down" we want the item to land after items[targetIdx], so beforeItemId is items[targetIdx + 1]; for "up" it's items[targetIdx].
        const beforeItemId = direction === 'up' ? items[targetIdx] : items[targetIdx + 1] ?? null;

        return {
            columnId,
            beforeItemId,
            announcement: `Position ${targetIdx + 1} of ${items.length}.`
        };
    }

    function computeAcrossColumnTarget(
        currentColumnId: string | number,
        direction: 'left' | 'right'
    ): { columnId: string | number; beforeItemId: string | number | null; announcement: string } | null {
        const currentIdx = getColumnIndex(currentColumnId);

        if (currentIdx === -1) {
            return null;
        }

        const nextColumn = getColumnByIndex(currentIdx + ACROSS_COLUMN_DELTA[direction]);

        if (!nextColumn) {
            return null;
        }

        const targetItems = getItemsInColumn(nextColumn.columnId);

        return {
            columnId: nextColumn.columnId,
            beforeItemId: targetItems[0] ?? null,
            announcement: `Moved to column ${String(nextColumn.columnId)}.`
        };
    }

    function commitKeyboardDrop(): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const currentColumnId = findCurrentColumnId(state.itemId);
        dragState.value = null;

        if (currentColumnId !== null) {
            options.onAnnounce(`Item dropped in ${String(currentColumnId)}.`);
        }
    }

    function cancelKeyboardDrop(): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const itemId = state.itemId;
        const currentColumnId = findCurrentColumnId(itemId);
        const currentBeforeItemId = currentColumnId !== null
            ? findCurrentBeforeItemId(itemId, currentColumnId)
            : null;

        const isAtOrigin = currentColumnId === state.fromColumnId
            && currentBeforeItemId === (state.originBeforeItemId ?? null);

        if (!isAtOrigin && currentColumnId !== null) {
            options.onMove({
                itemId,
                fromColumnId: currentColumnId,
                toColumnId: state.fromColumnId,
                beforeItemId: state.originBeforeItemId ?? undefined
            });
        }

        dragState.value = null;
        options.onAnnounce('Drop cancelled.');
    }

    function isItemGrabbed(itemId: string | number): boolean {
        const state = unref(dragState);
        return state !== null && state.mode === 'keyboard' && state.itemId === itemId;
    }

    /* endregion */

    /* region columns */

    function startColumnDrag(columnId: string | number): void {
        if (!unref(options.reorderableColumns) || unref(options.disabled)) {
            return;
        }

        columnDragState.value = {columnId, dropBeforeColumnId: null};
    }

    function endColumnDrag(): void {
        autoScroll.stop();
        columnDragState.value = null;
    }

    function updateColumnDropTarget(beforeColumnId: string | number | null): void {
        if (!columnDragState.value) {
            return;
        }

        columnDragState.value = {...columnDragState.value, dropBeforeColumnId: beforeColumnId};
    }

    function commitColumnDrop(): void {
        const state = columnDragState.value;
        autoScroll.stop();

        if (!state) {
            return;
        }

        if (state.dropBeforeColumnId === state.columnId) {
            columnDragState.value = null;
            return;
        }

        const fromIdx = getColumnIndex(state.columnId);
        const beforeIdx = state.dropBeforeColumnId === null
            ? -1
            : getColumnIndex(state.dropBeforeColumnId);

        if (fromIdx !== -1 && beforeIdx === fromIdx + 1) {
            columnDragState.value = null;
            return;
        }

        options.onMoveColumn({
            columnId: state.columnId,
            beforeColumnId: state.dropBeforeColumnId ?? undefined
        });
        columnDragState.value = null;
    }

    /* endregion */

    function cancelAll(): void {
        cancelKeyboardDrop();
        endDrag();
        endColumnDrag();
    }

    function onPointerMove(clientX: number, clientY: number): void {
        if (!unref(dragState) && !unref(columnDragState)) {
            return;
        }

        autoScroll.onPointerMove(clientX, clientY);
    }

    return {
        disabled: options.disabled,
        reorderableColumns: options.reorderableColumns,
        dragState,
        columnDragState,
        grabbedId,
        isOverColumnId,
        isDropAllowed,
        registerItem,
        unregisterItem,
        getItemInfo,
        registerColumn,
        unregisterColumn,
        getColumnInfo,
        setBoardElement,
        setColumnBodyElement,
        enterColumn,
        leaveColumn,
        startDrag,
        endDrag,
        updateDropTarget,
        clearDropTarget,
        commitDrop,
        grabItem,
        moveKeyboard,
        commitKeyboardDrop,
        cancelKeyboardDrop,
        isItemGrabbed,
        startColumnDrag,
        endColumnDrag,
        updateColumnDropTarget,
        commitColumnDrop,
        cancelAll,
        onPointerMove
    };
}
