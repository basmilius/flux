<script
    lang="ts"
    setup>
    import { useKeyboardGrab } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { computed, defineComponent, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue';
    import { useCalendarInjection } from '$flux/composable';
    import type { FluxCalendarItemData } from '$flux/data';
    import $style from '$flux/css/component/Calendar.module.scss';

    const {data} = defineProps<{
        readonly data: FluxCalendarItemData;
    }>();

    const dragContext = useCalendarInjection();
    const root = ref<HTMLButtonElement | null>(null);

    const canDrag = computed(() => dragContext?.isDraggable.value === true);

    const RenderItemContent = defineComponent({
        props: {
            render: {
                type: Function,
                required: true
            }
        },
        setup: (props) => () => (props.render as () => unknown)()
    });

    const {
        isGrabbed,
        handleKeyDown,
        release: releaseKeyboardGrab
    } = useKeyboardGrab({
        isDraggable: canDrag,
        itemId: toRef(() => data.id),
        grabbedId: dragContext?.grabbedId ?? ref<string | number | null>(null),
        onGrab() {
            dragContext?.onItemKeyboardGrab(data.id, data.date);
            return data.date;
        },
        onMove(direction) {
            dragContext?.onItemKeyboardMove(direction);
        },
        onCommit() {
            dragContext?.onItemKeyboardCommit();
        },
        onCancel() {
            dragContext?.onItemKeyboardCancel();
        }
    });

    const itemClasses = computed(() => clsx(
        $style.calendarItem,
        data.isClickable && $style.isClickable,
        canDrag.value && $style.isDraggable,
        isGrabbed.value && $style.isGrabbed,
        data.allDay && $style.isAllDay
    ));

    function onClick(evt: MouseEvent): void {
        data.handleClick(evt);
    }

    function onDragStart(evt: DragEvent): void {
        if (!canDrag.value || !dragContext) {
            return;
        }

        if (isGrabbed.value) {
            dragContext.onItemKeyboardCancel();
            releaseKeyboardGrab();
        }

        dragContext.onItemDragStart(data.id, data.date, evt);
    }

    function onDragEnd(): void {
        dragContext?.onItemDragEnd(data.id);
    }

    onMounted(() => {
        if (root.value) {
            dragContext?.registerItemElement(root.value, data.id);
        }
    });

    onBeforeUnmount(() => {
        if (root.value) {
            dragContext?.unregisterItemElement(root.value);
        }
    });

    watch(() => data.id, (_newId, _oldId) => {
        if (!root.value) {
            return;
        }

        dragContext?.unregisterItemElement(root.value);
        dragContext?.registerItemElement(root.value, data.id);
    });
</script>

<template>
    <button
        ref="root"
        :class="itemClasses"
        :draggable="canDrag"
        :tabindex="canDrag ? 0 : undefined"
        type="button"
        @click="onClick"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @keydown="handleKeyDown">
        <RenderItemContent :render="data.renderContent"/>
    </button>
</template>
