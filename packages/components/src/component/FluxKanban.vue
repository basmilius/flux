<template>
    <div
        ref="root"
        role="group"
        aria-roledescription="Kanban board"
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
    import { useKanban } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey, FluxKanbanInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Kanban.module.scss';

    const emit = defineEmits<{
        move: [FluxKanbanMoveEvent];
        moveColumn: [FluxKanbanMoveColumnEvent];
    }>();

    const {
        canMove,
        disabled = false,
        reorderableColumns = false
    } = defineProps<{
        readonly canMove?: (event: FluxKanbanMoveEvent) => boolean;
        readonly disabled?: boolean;
        readonly reorderableColumns?: boolean;
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

    watch(() => disabled, value => {
        if (value) {
            kanban.cancelAll();
        }
    });

    onMounted(() => {
        kanban.setBoardElement(root.value);
        window.addEventListener('dragover', onPointerMove);
        window.addEventListener('dragend', kanban.cancelAll);
    });

    onBeforeUnmount(() => {
        kanban.setBoardElement(null);
        window.removeEventListener('dragover', onPointerMove);
        window.removeEventListener('dragend', kanban.cancelAll);
    });

    function onPointerMove(evt: DragEvent | PointerEvent): void {
        kanban.onPointerMove(evt.clientX, evt.clientY);
    }

    provide(FluxKanbanInjectionKey, kanban);
    provide(FluxDisabledInjectionKey, disabledRef);
</script>
