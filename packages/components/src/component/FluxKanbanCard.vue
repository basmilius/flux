<template>
    <div
        ref="root"
        data-kanban-card
        :class="[
            $style.kanbanCard,
            isDragging && $style.isDragging,
            isDropBefore && $style.isDropBefore
        ]"
        draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover.prevent.stop="onDragOver">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, onMounted, onUnmounted, unref, useTemplateRef } from 'vue';
    import { FluxKanbanInjectionKey } from '$flux/data/di';
    import $style from '$flux/css/component/FluxKanbanCard.module.scss';

    const {cardId, columnId} = defineProps<{
        readonly cardId: string | number;
        readonly columnId: string | number;
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const kanban = inject(FluxKanbanInjectionKey)!;
    const root = useTemplateRef('root');

    const isDragging = computed(() => unref(kanban.dragState)?.cardId === cardId);

    const isDropBefore = computed(() => {
        const state = unref(kanban.dragState);

        if (!state || state.dropColumnId === null || state.beforeCardId === null) {
            return false;
        }

        return state.beforeCardId === cardId && state.cardId !== cardId;
    });

    onMounted(() => {
        if (root.value) {
            kanban.registerCard(root.value, cardId);
        }
    });

    onUnmounted(() => {
        if (root.value) {
            kanban.unregisterCard(root.value);
        }
    });

    function onDragStart(evt: DragEvent): void {
        kanban.startDrag(cardId, columnId);

        if (evt.dataTransfer) {
            evt.dataTransfer.effectAllowed = 'move';
        }
    }

    function onDragEnd(): void {
        kanban.endDrag();
    }

    function onDragOver(evt: DragEvent): void {
        const state = unref(kanban.dragState);

        if (!state) {
            return;
        }

        const cardEl = evt.currentTarget as Element;
        const rect = cardEl.getBoundingClientRect();

        if (evt.clientY < rect.top + rect.height / 2) {
            // Drop before this card
            kanban.updateDropTarget(columnId, cardId);
        } else {
            // Drop after this card = before the next sibling card
            let next = cardEl.nextElementSibling;

            while (next) {
                const info = kanban.getCardInfo(next);

                if (info) {
                    kanban.updateDropTarget(columnId, info.cardId);
                    return;
                }

                next = next.nextElementSibling;
            }

            // No next sibling → append to end of column
            kanban.updateDropTarget(columnId, null);
        }
    }
</script>
