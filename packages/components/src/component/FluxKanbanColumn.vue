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
        <header
            ref="header"
            :class="$style.kanbanColumnHeader"
            :draggable="isReorderable"
            :tabindex="isReorderable ? 0 : undefined"
            :aria-roledescription="isReorderable ? 'Draggable column' : undefined"
            :aria-keyshortcuts="isReorderable ? 'ArrowLeft ArrowRight' : undefined"
            @dragstart="onColumnDragStart"
            @dragend="onColumnDragEnd"
            @dragover="onColumnDragOver"
            @drop="onColumnDrop"
            @keydown="onColumnKeyDown">
            <div :class="$style.kanbanColumnHeaderCaption">
                <FluxIcon
                    v-if="icon"
                    :name="icon"/>

                <span>{{ label }}</span>

                <FluxBadge
                    v-if="count != null"
                    :label="String(count)"/>
            </div>

            <slot name="actions"/>
        </header>

        <main
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
                aria-hidden="true"
                :class="[
                    $style.kanbanDropIndicator,
                    dropIndicator !== null && $style.isVisible,
                    dropIndicator !== null && !kanban.isDropAllowed.value && $style.isDisallowed
                ]"
                :style="dropIndicator !== null ? { transform: `translateY(${dropIndicator}px)` } : undefined"/>
        </main>

        <footer
            v-if="hasFooter"
            :class="$style.kanbanColumnFooter">
            <slot name="footer"/>
        </footer>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { flattenVNodeTree } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import { Comment, computed, onBeforeUnmount, onMounted, provide, Text, toRef, unref, useSlots, useTemplateRef, watch } from 'vue';
    import { useDisabled, useKanbanInjection } from '~flux/components/composable';
    import { FluxDisabledInjectionKey } from '~flux/components/data';
    import FluxBadge from './FluxBadge.vue';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Kanban.module.scss';

    const {
        columnId,
        disabled = false,
        label
    } = defineProps<{
        readonly columnId: string | number;
        readonly count?: string | number;
        readonly disabled?: boolean;
        readonly icon?: FluxIconName;
        readonly label: string;
    }>();

    defineSlots<{
        default?(): any;
        actions?(): any;
        empty?(): any;
        footer?(): any;
    }>();

    const kanban = useKanbanInjection();
    const root = useTemplateRef('root');
    const header = useTemplateRef('header');
    const body = useTemplateRef('body');
    const slots = useSlots();

    const disabledState = useDisabled(toRef(() => disabled));
    provide(FluxDisabledInjectionKey, disabledState);

    const isOver = computed(() => kanban.isOverColumnId.value === columnId);
    const isReorderable = computed(() => unref(kanban.reorderableColumns) && !unref(disabledState));

    const dropIndicator = computed<number | null>(() => {
        const state = unref(kanban.dragState);
        const bodyEl = body.value;

        if (!state || state.dropColumnId !== columnId || !(bodyEl instanceof HTMLElement)) {
            return null;
        }

        const items = Array.from(bodyEl.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement && kanban.getItemInfo(child) !== undefined
        );

        if (state.beforeItemId === null) {
            const last = items[items.length - 1];
            return last ? last.offsetTop + last.offsetHeight + 4 : 4;
        }

        const target = items.find(el => kanban.getItemInfo(el)?.itemId === state.beforeItemId);
        return target ? target.offsetTop - 5 : null;
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

    function getSiblingColumnElement(from: Element, direction: 'previous' | 'next'): Element | null {
        const key = direction === 'previous' ? 'previousElementSibling' : 'nextElementSibling';

        let sibling = from[key];

        while (sibling) {
            if (kanban.getColumnInfo(sibling)) {
                return sibling;
            }

            sibling = sibling[key];
        }

        return null;
    }

    function reorderColumn(beforeColumnId: string | number | null): void {
        kanban.startColumnDrag(columnId);
        kanban.updateColumnDropTarget(beforeColumnId);
        kanban.commitColumnDrop();
        requestAnimationFrame(() => header.value?.focus());
    }

    function onColumnKeyDown(evt: KeyboardEvent): void {
        if (!unref(isReorderable) || (evt.key !== 'ArrowLeft' && evt.key !== 'ArrowRight')) {
            return;
        }

        const self = root.value;

        if (!self) {
            return;
        }

        evt.preventDefault();

        if (evt.key === 'ArrowLeft') {
            const previous = getSiblingColumnElement(self, 'previous');

            if (previous) {
                reorderColumn(kanban.getColumnInfo(previous)!.columnId);
            }
        } else {
            const next = getSiblingColumnElement(self, 'next');

            if (next) {
                // Land after the next column: drop before the column following it, or at the end (null).
                const afterNext = getSiblingColumnElement(next, 'next');
                reorderColumn(afterNext ? kanban.getColumnInfo(afterNext)!.columnId : null);
            }
        }
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
