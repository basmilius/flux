<template>
    <div
        ref="root"
        data-kanban-item
        role="listitem"
        aria-roledescription="Kanban item"
        :aria-disabled="disabledState ? true : undefined"
        :class="[
            $style.kanbanItem,
            isDragging && $style.isDragging,
            isGrabbed && $style.isGrabbed,
            disabledState && $style.isDisabled
        ]"
        :draggable="!disabledState"
        :tabindex="disabledState ? -1 : 0"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover.stop="onDragOver"
        @focus="onFocus"
        @keydown="handleKeyDown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useKeyboardGrab } from '@flux-ui/internals';
    import { computed, onBeforeUnmount, onMounted, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled, useKanbanInjection } from '~flux/components/composable';
    import $style from '~flux/components/css/component/Kanban.module.scss';

    const {
        columnId,
        disabled = false,
        itemId
    } = defineProps<{
        readonly columnId: string | number;
        readonly disabled?: boolean;
        readonly itemId: string | number;
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const kanban = useKanbanInjection();
    const root = useTemplateRef('root');
    const disabledState = useDisabled(toRef(() => disabled));

    const isDragging = computed(() => {
        const state = unref(kanban.dragState);
        return state?.itemId === itemId && state?.mode === 'pointer';
    });

    const {isGrabbed, handleKeyDown, release} = useKeyboardGrab<true>({
        isDraggable: computed(() => !unref(disabledState)),
        itemId: toRef(() => itemId),
        grabbedId: kanban.grabbedId,
        onGrab() {
            kanban.grabItem(itemId, columnId);
            return true;
        },
        onMove(direction) {
            kanban.moveKeyboard(direction);
        },
        onCommit() {
            kanban.commitKeyboardDrop();
        },
        onCancel() {
            kanban.cancelKeyboardDrop();
        }
    });

    onMounted(() => {
        if (root.value) {
            kanban.registerItem(root.value, itemId);
        }

        if (kanban.isItemGrabbed(itemId)) {
            root.value?.focus();
        }
    });

    onBeforeUnmount(() => {
        if (root.value) {
            kanban.unregisterItem(root.value);
        }
    });

    watch(() => itemId, (newId, oldId) => {
        if (root.value && oldId !== undefined) {
            kanban.unregisterItem(root.value);
            kanban.registerItem(root.value, newId);
        }
    });

    function onDragStart(evt: DragEvent): void {
        if (unref(disabledState)) {
            evt.preventDefault();
            return;
        }

        if (isGrabbed.value) {
            kanban.cancelKeyboardDrop();
            release();
        }

        kanban.startDrag(itemId, columnId);

        if (evt.dataTransfer) {
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('text/plain', `item:${String(itemId)}`);

            if (root.value) {
                const offsetX = evt.offsetX || root.value.getBoundingClientRect().width / 2;
                const offsetY = evt.offsetY || 12;
                evt.dataTransfer.setDragImage(root.value, offsetX, offsetY);
            }
        }
    }

    function onDragEnd(): void {
        kanban.endDrag();
    }

    function onFocus(): void {
        root.value?.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'smooth'});
    }

    function onDragOver(evt: DragEvent): void {
        const state = unref(kanban.dragState);

        if (!state || unref(disabledState)) {
            return;
        }

        evt.preventDefault();

        const itemEl = evt.currentTarget as Element;
        const rect = itemEl.getBoundingClientRect();

        if (evt.clientY < rect.top + rect.height / 2) {
            kanban.updateDropTarget(columnId, itemId);
        } else {
            let next = itemEl.nextElementSibling;

            while (next) {
                const info = kanban.getItemInfo(next);

                if (info) {
                    kanban.updateDropTarget(columnId, info.itemId);
                    return;
                }

                next = next.nextElementSibling;
            }

            kanban.updateDropTarget(columnId, null);
        }
    }
</script>
