<template>
    <div
        ref="root"
        role="group"
        aria-roledescription="Kanban board"
        :class="[$style.kanban, isDragging && $style.isBoardDragging]"
        :style="boardStyle">
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
    import { warn } from '@flux-ui/internals';
    import type { FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent, FluxKanbanSwimlaneMoveEvent } from '@flux-ui/types';
    import { computed, onBeforeUnmount, onMounted, provide, ref, toRef, useTemplateRef, watch } from 'vue';
    import { useKanban, useKanbanLayout } from '~flux/components/composable/private';
    import { FluxDisabledInjectionKey, FluxKanbanInjectionKey, FluxKanbanLayoutInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Kanban.module.scss';

    const emit = defineEmits<{
        move: [FluxKanbanSwimlaneMoveEvent];
        moveColumn: [FluxKanbanMoveColumnEvent];
    }>();

    const {
        canMove,
        disabled = false,
        reorderableColumns = false
    } = defineProps<{
        readonly canMove?: (event: FluxKanbanSwimlaneMoveEvent) => boolean;
        readonly disabled?: boolean;
        readonly reorderableColumns?: boolean;
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const root = useTemplateRef('root');
    const liveMessage = ref('');

    const layout = useKanbanLayout();

    const disabledRef = toRef(() => disabled);
    const reorderableColumnsRef = computed(() => reorderableColumns && !layout.hasSwimlanes.value);
    const canMoveRef = toRef(() => canMove ? (event: FluxKanbanMoveEvent) => canMove(toSwimlaneMoveEvent(event)) : undefined);

    const kanban = useKanban({
        disabled: disabledRef,
        reorderableColumns: reorderableColumnsRef,
        canMove: canMoveRef,
        onMove: event => emit('move', toSwimlaneMoveEvent(event)),
        onMoveColumn: event => emit('moveColumn', event),
        onAnnounce: message => {
            liveMessage.value = '';
            requestAnimationFrame(() => {
                liveMessage.value = message;
            });
        }
    });

    const isDragging = computed(() => kanban.dragState.value !== null || kanban.columnDragState.value !== null);

    const boardStyle = computed(() => layout.hasSwimlanes.value ? {'--flux-kanban-columns': layout.columnCount.value} : undefined);

    watch(() => disabled, value => {
        if (value) {
            kanban.cancelAll();
        }
    });

    watch(() => reorderableColumns && layout.hasSwimlanes.value, value => {
        if (value) {
            warn('FluxKanban', 'reorderableColumns is ignored on a board with swimlanes, a move-column event cannot tell a single lane apart from the whole board.');
        }
    }, {immediate: true});

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

    function toSwimlaneMoveEvent(event: FluxKanbanMoveEvent): FluxKanbanSwimlaneMoveEvent {
        const from = layout.resolveCell(event.fromColumnId);
        const to = layout.resolveCell(event.toColumnId);

        if (from.swimlaneId === undefined && to.swimlaneId === undefined) {
            return event;
        }

        return {
            ...event,
            fromColumnId: from.columnId,
            toColumnId: to.columnId,
            fromSwimlaneId: from.swimlaneId,
            toSwimlaneId: to.swimlaneId
        };
    }

    provide(FluxKanbanInjectionKey, kanban);
    provide(FluxKanbanLayoutInjectionKey, layout);
    provide(FluxDisabledInjectionKey, disabledRef);
</script>
