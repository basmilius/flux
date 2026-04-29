import type { FluxKanbanMoveEvent } from '@flux-ui/types';
import { ref } from 'vue';
import type { FluxKanbanDragState, FluxKanbanInjection } from '$flux/data/di';

/**
 * Internal composable for managing kanban drag-and-drop state.
 * Provides card registration, drag tracking, and drop target management.
 */
export function useKanban(onMove: (event: FluxKanbanMoveEvent) => void): FluxKanbanInjection {
    const dragState = ref<FluxKanbanDragState | null>(null);
    const cardRegistry = new WeakMap<Element, { readonly cardId: string | number }>();

    function registerCard(element: Element, cardId: string | number): void {
        cardRegistry.set(element, {cardId});
    }

    function unregisterCard(element: Element): void {
        cardRegistry.delete(element);
    }

    function getCardInfo(element: Element): { readonly cardId: string | number } | undefined {
        return cardRegistry.get(element);
    }

    function startDrag(cardId: string | number, fromColumnId: string | number): void {
        dragState.value = {cardId, fromColumnId, dropColumnId: null, beforeCardId: null};
    }

    function endDrag(): void {
        dragState.value = null;
    }

    function updateDropTarget(columnId: string | number, beforeCardId: string | number | null): void {
        if (!dragState.value) {
            return;
        }

        dragState.value = {...dragState.value, dropColumnId: columnId, beforeCardId};
    }

    function clearDropTarget(): void {
        if (!dragState.value) {
            return;
        }

        dragState.value = {...dragState.value, dropColumnId: null, beforeCardId: null};
    }

    function commitDrop(): void {
        const state = dragState.value;

        if (!state || state.dropColumnId === null) {
            dragState.value = null;
            return;
        }

        onMove({
            cardId: state.cardId,
            fromColumnId: state.fromColumnId,
            toColumnId: state.dropColumnId,
            beforeCardId: state.beforeCardId ?? undefined
        });

        dragState.value = null;
    }

    return {dragState, registerCard, unregisterCard, getCardInfo, startDrag, endDrag, updateDropTarget, clearDropTarget, commitDrop};
}
