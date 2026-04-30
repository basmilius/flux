<template>
    <div
        ref="root"
        data-kanban-card
        role="listitem"
        aria-roledescription="Kanban card"
        :aria-disabled="disabledState ? true : undefined"
        :aria-grabbed="isGrabbed ? true : undefined"
        :class="[
            $style.kanbanCard,
            isDragging && $style.isDragging,
            isGrabbed && $style.isGrabbed,
            isDropBefore && $style.isDropBefore,
            isDropBefore && !kanban.isDropAllowed.value && $style.isDropBeforeDisallowed,
            disabledState && $style.isDisabled
        ]"
        :draggable="!disabledState"
        :tabindex="disabledState ? -1 : 0"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragover.stop="onDragOver"
        @focus="onFocus"
        @keydown="onKeyDown">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, inject, onBeforeUnmount, onMounted, toRef, unref, useTemplateRef, watch } from 'vue';
    import { FluxKanbanInjectionKey } from '$flux/data/di';
    import useDisabled from '$flux/composable/useDisabled';
    import $style from '$flux/css/component/FluxKanban.module.scss';

    const {
        cardId,
        columnId,
        disabled = false
    } = defineProps<{
        readonly cardId: string | number;
        readonly columnId: string | number;
        readonly disabled?: boolean;
    }>();

    defineSlots<{
        default?(): any;
    }>();

    const kanban = inject(FluxKanbanInjectionKey)!;
    const root = useTemplateRef('root');
    const disabledState = useDisabled(toRef(() => disabled));

    const isDragging = computed(() => unref(kanban.dragState)?.cardId === cardId && unref(kanban.dragState)?.mode === 'pointer');
    const isGrabbed = computed(() => kanban.isCardGrabbed(cardId));

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

        if (kanban.isCardGrabbed(cardId)) {
            root.value?.focus();
        }
    });

    onBeforeUnmount(() => {
        if (root.value) {
            kanban.unregisterCard(root.value);
        }
    });

    watch(() => cardId, (newId, oldId) => {
        if (root.value && oldId !== undefined) {
            kanban.unregisterCard(root.value);
            kanban.registerCard(root.value, newId);
        }
    });

    function onDragStart(evt: DragEvent): void {
        if (unref(disabledState)) {
            evt.preventDefault();
            return;
        }

        kanban.startDrag(cardId, columnId);

        if (evt.dataTransfer) {
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('text/plain', `card:${String(cardId)}`);

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

        const cardEl = evt.currentTarget as Element;
        const rect = cardEl.getBoundingClientRect();

        if (evt.clientY < rect.top + rect.height / 2) {
            kanban.updateDropTarget(columnId, cardId);
        } else {
            let next = cardEl.nextElementSibling;

            while (next) {
                const info = kanban.getCardInfo(next);

                if (info) {
                    kanban.updateDropTarget(columnId, info.cardId);
                    return;
                }

                next = next.nextElementSibling;
            }

            kanban.updateDropTarget(columnId, null);
        }
    }

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(disabledState)) {
            return;
        }

        const state = unref(kanban.dragState);
        const grabbed = state !== null && state.mode === 'keyboard' && state.cardId === cardId;

        if (!grabbed) {
            if (evt.key === ' ' || evt.key === 'Enter') {
                evt.preventDefault();
                kanban.grabCard(cardId, columnId);
            }
            return;
        }

        switch (evt.key) {
            case 'ArrowUp':
                evt.preventDefault();
                kanban.moveKeyboard('up');
                break;

            case 'ArrowDown':
                evt.preventDefault();
                kanban.moveKeyboard('down');
                break;

            case 'ArrowLeft':
                evt.preventDefault();
                kanban.moveKeyboard('left');
                break;

            case 'ArrowRight':
                evt.preventDefault();
                kanban.moveKeyboard('right');
                break;

            case ' ':
            case 'Enter':
                evt.preventDefault();
                kanban.commitKeyboardDrop();
                break;

            case 'Escape':
                evt.preventDefault();
                kanban.cancelKeyboardDrop();
                break;
        }
    }
</script>
