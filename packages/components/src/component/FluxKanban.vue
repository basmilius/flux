<template>
    <div
        ref="root"
        role="application"
        aria-roledescription="Kanban board"
        :aria-label="ariaLabel"
        :class="[$style.kanban, isDragging && $style.isBoardDragging]">
        <slot/>

        <div
            aria-live="polite"
            aria-atomic="true"
            :class="$style.kanbanLiveRegion">
            {{ liveMessage }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent } from '@flux-ui/types';
    import { computed, onBeforeUnmount, onMounted, provide, ref, toRef, useTemplateRef, watch } from 'vue';
    import { useKanban } from '$flux/composable/private';
    import { FluxDisabledInjectionKey, FluxKanbanInjectionKey } from '$flux/data/di';
    import $style from '$flux/css/component/Kanban.module.scss';

    const {
        ariaLabel,
        canMove,
        disabled = false,
        reorderableColumns = false
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly canMove?: (event: FluxKanbanMoveEvent) => boolean;
        readonly disabled?: boolean;
        readonly reorderableColumns?: boolean;
    }>();

    const emit = defineEmits<{
        move: [FluxKanbanMoveEvent];
        moveColumn: [FluxKanbanMoveColumnEvent];
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const root = useTemplateRef('root');
    const liveMessage = ref('');

    const disabledRef = toRef(() => disabled);
    const reorderableColumnsRef = toRef(() => reorderableColumns);
    const canMoveRef = toRef(() => canMove);

    const kanban = useKanban({
        disabled: disabledRef,
        reorderableColumns: reorderableColumnsRef,
        canMove: canMoveRef,
        onMove: event => emit('move', event),
        onMoveColumn: event => emit('moveColumn', event),
        onAnnounce: message => {
            liveMessage.value = '';
            requestAnimationFrame(() => {
                liveMessage.value = message;
            });
        }
    });

    const isDragging = computed(() => kanban.dragState.value !== null || kanban.columnDragState.value !== null);

    function onPointerMove(evt: DragEvent | PointerEvent): void {
        kanban.onPointerMove(evt.clientX, evt.clientY);
    }

    onMounted(() => {
        kanban.setBoardElement(root.value);
        window.addEventListener('drag', onPointerMove);
        window.addEventListener('dragend', kanban.cancelAll);
    });

    onBeforeUnmount(() => {
        kanban.setBoardElement(null);
        window.removeEventListener('drag', onPointerMove);
        window.removeEventListener('dragend', kanban.cancelAll);
    });

    watch(() => disabled, value => {
        if (value) {
            kanban.cancelAll();
        }
    });

    provide(FluxKanbanInjectionKey, kanban);
    provide(FluxDisabledInjectionKey, disabledRef);
</script>
