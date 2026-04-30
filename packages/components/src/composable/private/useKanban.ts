import type { FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent } from '@flux-ui/types';
import type { Ref } from 'vue';
import { computed, ref, unref } from 'vue';
import type { FluxKanbanColumnDragState, FluxKanbanDragState, FluxKanbanInjection, FluxKanbanKeyboardDirection } from '$flux/data/di';

export type UseKanbanOptions = {
    readonly disabled: Ref<boolean>;
    readonly reorderableColumns: Ref<boolean>;
    readonly canMove?: Ref<((event: FluxKanbanMoveEvent) => boolean) | undefined>;
    readonly onMove: (event: FluxKanbanMoveEvent) => void;
    readonly onMoveColumn: (event: FluxKanbanMoveColumnEvent) => void;
    readonly onAnnounce: (message: string) => void;
};

const AUTOSCROLL_ZONE = 40;
const AUTOSCROLL_MAX_SPEED = 12;
const DRAG_LEAVE_GRACE_MS = 50;

/**
 * Internal composable for managing kanban drag-and-drop state.
 * Provides card registration, drag tracking, drop target management,
 * keyboard drag-and-drop, column reordering, drop validation and auto-scroll.
 */
export function useKanban(options: UseKanbanOptions): FluxKanbanInjection {
    const dragState = ref<FluxKanbanDragState | null>(null);
    const columnDragState = ref<FluxKanbanColumnDragState | null>(null);

    const cardRegistry = new WeakMap<Element, { readonly cardId: string | number }>();
    const cardElementsById = new Map<string | number, Element>();
    const columnRegistry = new WeakMap<Element, { readonly columnId: string | number }>();
    const columnElementsById = new Map<string | number, Element>();
    const columnBodyById = new Map<string | number, Element>();

    let boardElement: Element | null = null;
    let clearTimer: ReturnType<typeof setTimeout> | null = null;
    let autoScrollFrame: number | null = null;
    let autoScrollX = 0;
    let autoScrollY = 0;
    let autoScrollVerticalTarget: Element | null = null;

    const isDropAllowed = computed(() => {
        const state = unref(dragState);

        if (!state || state.dropColumnId === null) {
            return true;
        }

        const validate = unref(options.canMove);

        if (!validate) {
            return true;
        }

        return validate(buildMoveEvent(state));
    });

    function buildMoveEvent(state: FluxKanbanDragState): FluxKanbanMoveEvent {
        return {
            cardId: state.cardId,
            fromColumnId: state.fromColumnId,
            toColumnId: state.dropColumnId as string | number,
            beforeCardId: state.beforeCardId ?? undefined
        };
    }

    function clearTimerIfAny(): void {
        if (clearTimer !== null) {
            clearTimeout(clearTimer);
            clearTimer = null;
        }
    }

    function isSelfDrop(state: FluxKanbanDragState): boolean {
        if (state.dropColumnId !== state.fromColumnId) {
            return false;
        }

        if (state.beforeCardId === state.cardId) {
            return true;
        }

        const fromBody = columnBodyById.get(state.fromColumnId);

        if (!fromBody) {
            return false;
        }

        const cards = Array.from(fromBody.children).filter(child => cardRegistry.has(child));
        const draggedIndex = cards.findIndex(elm => cardRegistry.get(elm)?.cardId === state.cardId);

        if (draggedIndex === -1) {
            return false;
        }

        if (state.beforeCardId === null) {
            return draggedIndex === cards.length - 1;
        }

        const beforeIndex = cards.findIndex(elm => cardRegistry.get(elm)?.cardId === state.beforeCardId);
        return beforeIndex !== -1 && beforeIndex === draggedIndex + 1;
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

    function getCardsInColumn(columnId: string | number): (string | number)[] {
        const body = columnBodyById.get(columnId);

        if (!body) {
            return [];
        }

        return Array.from(body.children)
            .map(child => cardRegistry.get(child)?.cardId)
            .filter((id): id is string | number => id !== undefined);
    }

    function registerCard(element: Element, cardId: string | number): void {
        cardRegistry.set(element, {cardId});
        cardElementsById.set(cardId, element);
    }

    function unregisterCard(element: Element): void {
        const info = cardRegistry.get(element);

        if (info) {
            cardElementsById.delete(info.cardId);
        }

        cardRegistry.delete(element);
    }

    function getCardInfo(element: Element): { readonly cardId: string | number } | undefined {
        return cardRegistry.get(element);
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

    function startDrag(cardId: string | number, fromColumnId: string | number): void {
        if (unref(options.disabled)) {
            return;
        }

        clearTimerIfAny();
        dragState.value = {mode: 'pointer', cardId, fromColumnId, dropColumnId: null, beforeCardId: null};
    }

    function endDrag(): void {
        clearTimerIfAny();
        stopAutoScroll();
        dragState.value = null;
    }

    function updateDropTarget(columnId: string | number, beforeCardId: string | number | null): void {
        if (!dragState.value) {
            return;
        }

        clearTimerIfAny();
        dragState.value = {...dragState.value, dropColumnId: columnId, beforeCardId};
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

            dragState.value = {...dragState.value, dropColumnId: null, beforeCardId: null};
        }, DRAG_LEAVE_GRACE_MS);
    }

    function commitDrop(): void {
        const state = dragState.value;
        clearTimerIfAny();
        stopAutoScroll();

        if (!state || state.dropColumnId === null) {
            dragState.value = null;
            return;
        }

        if (isSelfDrop(state)) {
            dragState.value = null;
            return;
        }

        const event = buildMoveEvent(state);
        const validate = unref(options.canMove);

        if (validate && !validate(event)) {
            options.onAnnounce('Drop not allowed.');
            dragState.value = null;
            return;
        }

        options.onMove(event);
        options.onAnnounce(`Card moved to ${String(state.dropColumnId)}.`);
        dragState.value = null;
    }

    /* region keyboard */

    function findCurrentColumnId(cardId: string | number): string | number | null {
        for (const columnId of columnElementsById.keys()) {
            if (getCardsInColumn(columnId).includes(cardId)) {
                return columnId;
            }
        }

        return null;
    }

    function findCurrentBeforeCardId(cardId: string | number, columnId: string | number): string | number | null {
        const cards = getCardsInColumn(columnId);
        const idx = cards.indexOf(cardId);

        if (idx === -1) {
            return null;
        }

        return cards[idx + 1] ?? null;
    }

    function grabCard(cardId: string | number, fromColumnId: string | number): void {
        if (unref(options.disabled)) {
            return;
        }

        clearTimerIfAny();

        dragState.value = {
            mode: 'keyboard',
            cardId,
            fromColumnId,
            dropColumnId: null,
            beforeCardId: null,
            originBeforeCardId: findCurrentBeforeCardId(cardId, fromColumnId)
        };
        options.onAnnounce('Card grabbed. Use arrow keys to move, Enter to drop, Escape to cancel.');
    }

    function moveKeyboard(direction: FluxKanbanKeyboardDirection): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const cardId = state.cardId;
        const currentColumnId = findCurrentColumnId(cardId);

        if (currentColumnId === null) {
            return;
        }

        const target = direction === 'up' || direction === 'down'
            ? computeWithinColumnTarget(cardId, currentColumnId, direction)
            : computeAcrossColumnTarget(currentColumnId, direction);

        if (!target) {
            return;
        }

        const event: FluxKanbanMoveEvent = {
            cardId,
            fromColumnId: currentColumnId,
            toColumnId: target.columnId,
            beforeCardId: target.beforeCardId ?? undefined
        };

        const validate = unref(options.canMove);

        if (validate && !validate(event)) {
            options.onAnnounce('Move not allowed.');
            return;
        }

        options.onMove(event);
        options.onAnnounce(target.announcement);
        restoreCardFocus(cardId);
    }

    function restoreCardFocus(cardId: string | number): void {
        requestAnimationFrame(() => {
            const elm = cardElementsById.get(cardId);

            if (elm instanceof HTMLElement) {
                elm.focus();
            }
        });
    }

    function computeWithinColumnTarget(
        cardId: string | number,
        columnId: string | number,
        direction: 'up' | 'down'
    ): { columnId: string | number; beforeCardId: string | number | null; announcement: string } | null {
        const cards = getCardsInColumn(columnId);
        const idx = cards.indexOf(cardId);

        if (idx === -1) {
            return null;
        }

        if (direction === 'up') {
            if (idx === 0) {
                return null;
            }

            return {
                columnId,
                beforeCardId: cards[idx - 1],
                announcement: `Position ${idx} of ${cards.length}.`
            };
        }

        if (idx === cards.length - 1) {
            return null;
        }

        return {
            columnId,
            beforeCardId: cards[idx + 2] ?? null,
            announcement: `Position ${idx + 2} of ${cards.length}.`
        };
    }

    function computeAcrossColumnTarget(
        currentColumnId: string | number,
        direction: 'left' | 'right'
    ): { columnId: string | number; beforeCardId: string | number | null; announcement: string } | null {
        const currentIdx = getColumnIndex(currentColumnId);

        if (currentIdx === -1) {
            return null;
        }

        const nextIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
        const nextColumn = getColumnByIndex(nextIdx);

        if (!nextColumn) {
            return null;
        }

        const targetCards = getCardsInColumn(nextColumn.columnId);

        return {
            columnId: nextColumn.columnId,
            beforeCardId: targetCards[0] ?? null,
            announcement: `Moved to column ${String(nextColumn.columnId)}.`
        };
    }

    function commitKeyboardDrop(): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const currentColumnId = findCurrentColumnId(state.cardId);
        dragState.value = null;

        if (currentColumnId !== null) {
            options.onAnnounce(`Card dropped in ${String(currentColumnId)}.`);
        }
    }

    function cancelKeyboardDrop(): void {
        const state = dragState.value;

        if (!state || state.mode !== 'keyboard') {
            return;
        }

        const cardId = state.cardId;
        const currentColumnId = findCurrentColumnId(cardId);
        const currentBeforeCardId = currentColumnId !== null
            ? findCurrentBeforeCardId(cardId, currentColumnId)
            : null;

        const isAtOrigin = currentColumnId === state.fromColumnId
            && currentBeforeCardId === (state.originBeforeCardId ?? null);

        if (!isAtOrigin && currentColumnId !== null) {
            options.onMove({
                cardId,
                fromColumnId: currentColumnId,
                toColumnId: state.fromColumnId,
                beforeCardId: state.originBeforeCardId ?? undefined
            });
        }

        dragState.value = null;
        options.onAnnounce('Drop cancelled.');
    }

    function isCardGrabbed(cardId: string | number): boolean {
        const state = unref(dragState);
        return state !== null && state.mode === 'keyboard' && state.cardId === cardId;
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
        stopAutoScroll();
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
        stopAutoScroll();

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

    /* region auto-scroll */

    function onPointerMove(clientX: number, clientY: number): void {
        if (!unref(dragState) && !unref(columnDragState)) {
            return;
        }

        autoScrollX = computeHorizontalScrollDelta(clientX);
        autoScrollY = 0;
        autoScrollVerticalTarget = null;

        const state = unref(dragState);

        if (state && state.dropColumnId !== null) {
            const body = columnBodyById.get(state.dropColumnId);

            if (body) {
                autoScrollY = computeVerticalScrollDelta(body, clientY);
                autoScrollVerticalTarget = body;
            }
        }

        if (autoScrollX !== 0 || autoScrollY !== 0) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    }

    function computeHorizontalScrollDelta(clientX: number): number {
        if (!boardElement) {
            return 0;
        }

        const rect = boardElement.getBoundingClientRect();

        if (clientX < rect.left + AUTOSCROLL_ZONE) {
            const distance = Math.max(0, clientX - rect.left);
            return -Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
        }

        if (clientX > rect.right - AUTOSCROLL_ZONE) {
            const distance = Math.max(0, rect.right - clientX);
            return Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
        }

        return 0;
    }

    function computeVerticalScrollDelta(target: Element, clientY: number): number {
        const rect = target.getBoundingClientRect();

        if (clientY < rect.top + AUTOSCROLL_ZONE) {
            const distance = Math.max(0, clientY - rect.top);
            return -Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
        }

        if (clientY > rect.bottom - AUTOSCROLL_ZONE) {
            const distance = Math.max(0, rect.bottom - clientY);
            return Math.round(((AUTOSCROLL_ZONE - distance) / AUTOSCROLL_ZONE) * AUTOSCROLL_MAX_SPEED);
        }

        return 0;
    }

    function startAutoScroll(): void {
        if (autoScrollFrame !== null) {
            return;
        }

        const tick = () => {
            if (autoScrollX !== 0 && boardElement) {
                boardElement.scrollLeft += autoScrollX;
            }

            if (autoScrollY !== 0 && autoScrollVerticalTarget) {
                autoScrollVerticalTarget.scrollTop += autoScrollY;
            }

            if (autoScrollX === 0 && autoScrollY === 0) {
                autoScrollFrame = null;
                return;
            }

            autoScrollFrame = requestAnimationFrame(tick);
        };

        autoScrollFrame = requestAnimationFrame(tick);
    }

    function stopAutoScroll(): void {
        if (autoScrollFrame !== null) {
            cancelAnimationFrame(autoScrollFrame);
            autoScrollFrame = null;
        }

        autoScrollX = 0;
        autoScrollY = 0;
        autoScrollVerticalTarget = null;
    }

    /* endregion */

    return {
        disabled: options.disabled,
        reorderableColumns: options.reorderableColumns,
        dragState,
        columnDragState,
        isDropAllowed,
        registerCard,
        unregisterCard,
        getCardInfo,
        registerColumn,
        unregisterColumn,
        getColumnInfo,
        setBoardElement,
        setColumnBodyElement,
        startDrag,
        endDrag,
        updateDropTarget,
        clearDropTarget,
        commitDrop,
        grabCard,
        moveKeyboard,
        commitKeyboardDrop,
        cancelKeyboardDrop,
        isCardGrabbed,
        startColumnDrag,
        endColumnDrag,
        updateColumnDropTarget,
        commitColumnDrop,
        onPointerMove
    };
}
