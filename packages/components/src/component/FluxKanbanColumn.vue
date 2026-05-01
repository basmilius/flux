<template>
    <div
        ref="root"
        role="list"
        aria-roledescription="Kanban column"
        :aria-label="label"
        :aria-disabled="disabledState ? true : undefined"
        :class="[
            $style.kanbanColumn,
            isOver && $style.isOver,
            isOver && !kanban.isDropAllowed.value && $style.isDropDisallowed,
            isReorderable && $style.isReorderable,
            isColumnDragging && $style.isColumnDragging,
            isColumnDropBefore && $style.isColumnDropBefore,
            disabledState && $style.isDisabled
        ]">
        <div
            :class="$style.kanbanColumnHeader"
            :draggable="isReorderable && !disabledState"
            :tabindex="isReorderable && !disabledState ? 0 : undefined"
            @dragstart="onColumnDragStart"
            @dragend="onColumnDragEnd"
            @dragover="onColumnDragOver"
            @drop="onColumnDrop">
            <slot name="header">
                <span :class="$style.kanbanColumnLabel">{{ label }}</span>
            </slot>

            <slot name="actions"/>
        </div>

        <div
            ref="body"
            :class="$style.kanbanColumnBody"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDrop">
            <slot/>

            <div
                v-if="isEmpty"
                :class="$style.kanbanColumnEmpty">
                <slot name="empty"/>
            </div>

            <div
                :class="[
                    $style.kanbanDropIndicator,
                    isDropEnd && $style.isDropEndActive,
                    isDropEnd && !kanban.isDropAllowed.value && $style.isDropEndDisallowed
                ]"/>
        </div>

        <div
            v-if="hasFooter"
            :class="$style.kanbanColumnFooter">
            <slot name="footer"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { Comment, Text, computed, onBeforeUnmount, onMounted, provide, toRef, unref, useSlots, useTemplateRef, watch } from 'vue';
    import { flattenVNodeTree } from '@flux-ui/internals';
    import { FluxDisabledInjectionKey } from '$flux/data/di';
    import useDisabled from '$flux/composable/useDisabled';
    import useFluxKanbanInjection from '$flux/composable/useFluxKanbanInjection';
    import $style from '$flux/css/component/FluxKanban.module.scss';

    const {
        columnId,
        disabled = false,
        label
    } = defineProps<{
        readonly columnId: string | number;
        readonly disabled?: boolean;
        readonly label: string;
    }>();

    defineSlots<{
        default?(): any;
        header?(): any;
        actions?(): any;
        empty?(): any;
        footer?(): any;
    }>();

    const kanban = useFluxKanbanInjection();
    const root = useTemplateRef('root');
    const body = useTemplateRef('body');
    const slots = useSlots();

    const disabledState = useDisabled(toRef(() => disabled));
    provide(FluxDisabledInjectionKey, disabledState);

    const isOver = computed(() => kanban.isOverColumnId.value === columnId);
    const isReorderable = computed(() => unref(kanban.reorderableColumns) && !unref(disabledState));

    const isDropEnd = computed(() => {
        const state = unref(kanban.dragState);
        return state !== null && state.dropColumnId === columnId && state.beforeItemId === null;
    });

    const isColumnDragging = computed(() => unref(kanban.columnDragState)?.columnId === columnId);

    const isColumnDropBefore = computed(() => {
        const state = unref(kanban.columnDragState);

        if (!state || state.dropBeforeColumnId !== columnId || state.columnId === columnId) {
            return false;
        }

        return true;
    });

    const isEmpty = computed(() => {
        if (!slots.empty) {
            return false;
        }

        const defaultSlot = slots.default?.();

        if (!defaultSlot || defaultSlot.length === 0) {
            return true;
        }

        const hasContent = flattenVNodeTree(defaultSlot).some(vnode => vnode.type !== Comment && vnode.type !== Text);
        return !hasContent;
    });

    const hasFooter = computed(() => !!slots.footer);

    function onDragEnter(): void {
        kanban.enterColumn(columnId);
    }

    function onDragLeave(): void {
        kanban.leaveColumn(columnId);
    }

    function onDragOver(evt: DragEvent): void {
        if (unref(disabledState) || !unref(kanban.dragState)) {
            return;
        }

        evt.preventDefault();

        const target = evt.target as Element;
        const isOverItem = !!target.closest('[data-kanban-item]');

        if (!isOverItem) {
            kanban.updateDropTarget(columnId, null);
        }
    }

    function onDrop(evt: DragEvent): void {
        if (unref(disabledState) || !unref(kanban.dragState)) {
            return;
        }

        evt.preventDefault();
        kanban.commitDrop();
    }

    function onColumnDragStart(evt: DragEvent): void {
        if (!unref(isReorderable)) {
            return;
        }

        if (evt.dataTransfer) {
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('text/plain', `column:${String(columnId)}`);
        }

        kanban.startColumnDrag(columnId);
    }

    function onColumnDragEnd(): void {
        kanban.endColumnDrag();
    }

    function onColumnDragOver(evt: DragEvent): void {
        const state = unref(kanban.columnDragState);

        if (!state || state.columnId === columnId) {
            return;
        }

        evt.preventDefault();

        const headerEl = evt.currentTarget as Element;
        const rect = headerEl.getBoundingClientRect();

        if (evt.clientX < rect.left + rect.width / 2) {
            kanban.updateColumnDropTarget(columnId);
        } else {
            let next = root.value?.nextElementSibling ?? null;

            while (next) {
                const info = kanban.getColumnInfo(next);

                if (info) {
                    kanban.updateColumnDropTarget(info.columnId);
                    return;
                }

                next = next.nextElementSibling;
            }

            kanban.updateColumnDropTarget(null);
        }
    }

    function onColumnDrop(evt: DragEvent): void {
        if (!unref(kanban.columnDragState)) {
            return;
        }

        evt.preventDefault();
        kanban.commitColumnDrop();
    }

    onMounted(() => {
        if (root.value) {
            kanban.registerColumn(root.value, columnId);
        }

        if (body.value) {
            kanban.setColumnBodyElement(columnId, body.value);
        }
    });

    onBeforeUnmount(() => {
        if (root.value) {
            kanban.unregisterColumn(root.value);
        }

        kanban.setColumnBodyElement(columnId, null);
    });

    watch(() => columnId, (newId, oldId) => {
        if (oldId !== undefined) {
            kanban.setColumnBodyElement(oldId, null);
        }

        if (root.value) {
            kanban.unregisterColumn(root.value);
            kanban.registerColumn(root.value, newId);
        }

        if (body.value) {
            kanban.setColumnBodyElement(newId, body.value);
        }
    });
</script>
