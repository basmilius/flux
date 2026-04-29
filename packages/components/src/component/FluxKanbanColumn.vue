<template>
    <div
        data-kanban-column
        :class="[$style.kanbanColumn, isOver && $style.isOver]">
        <div :class="$style.kanbanColumnHeader">
            <slot name="header">
                <span :class="$style.kanbanColumnLabel">{{ label }}</span>
            </slot>

            <slot name="actions"/>
        </div>

        <div
            :class="$style.kanbanColumnBody"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover.prevent="onDragOver"
            @drop.prevent="onDrop">
            <slot/>

            <div
                v-if="isDropEnd"
                :class="$style.kanbanDropIndicator"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, ref, unref } from 'vue';
    import { FluxKanbanInjectionKey } from '$flux/data/di';
    import $style from '$flux/css/component/FluxKanbanColumn.module.scss';

    const {columnId, label} = defineProps<{
        readonly columnId: string | number;
        readonly label: string;
    }>();

    defineSlots<{
        default?(): any;
        header?(): any;
        actions?(): any;
    }>();

    const kanban = inject(FluxKanbanInjectionKey)!;

    let dragEnterCount = 0;
    const isOver = ref(false);

    const isDropEnd = computed(() => {
        const state = unref(kanban.dragState);
        return state !== null && state.dropColumnId === columnId && state.beforeCardId === null;
    });

    function onDragEnter(): void {
        dragEnterCount++;
        isOver.value = true;
    }

    function onDragLeave(): void {
        if (--dragEnterCount <= 0) {
            dragEnterCount = 0;
            isOver.value = false;
            kanban.clearDropTarget();
        }
    }

    function onDragOver(evt: DragEvent): void {
        // Only handle empty-area drops; cards stop propagation on their own dragover
        const target = evt.target as Element;
        const isOverCard = !!target.closest('[data-kanban-card]');

        if (!isOverCard) {
            kanban.updateDropTarget(columnId, null);
        }
    }

    function onDrop(): void {
        dragEnterCount = 0;
        isOver.value = false;
        kanban.commitDrop();
    }
</script>
