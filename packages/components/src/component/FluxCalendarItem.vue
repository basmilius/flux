<template>
    <button
        ref="root"
        :class="itemClasses"
        :draggable="canDrag"
        :tabindex="canDrag ? 0 : undefined"
        type="button"
        @click="emit('click', $event)"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @keydown="handleKeyDown">
        <slot/>
    </button>
</template>

<script
    lang="ts"
    setup>
    import { useKeyboardGrab } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import type { DateTime } from 'luxon';
    import type { VNode } from 'vue';
    import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue';
    import useFluxCalendarInjection from '$flux/composable/useFluxCalendarInjection';
    import $style from '$flux/css/component/Calendar.module.scss';

    const emit = defineEmits<{
        click: [MouseEvent];
    }>();

    const {
        date,
        id,
        allDay = false
    } = defineProps<{
        readonly date: DateTime;
        readonly id?: string | number;
        /** Length of the item in minutes. Read by FluxCalendar in time-grid views (default 60). */
        readonly duration?: number;
        readonly allDay?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const root = ref<HTMLButtonElement | null>(null);
    const instance = getCurrentInstance();
    const dragContext = useFluxCalendarInjection();

    const isClickable = computed(() => !!instance?.vnode?.props?.onClick);
    const canDrag = computed(() =>
        dragContext?.isDraggable.value === true && id != null);

    const {
        isGrabbed,
        handleKeyDown,
        release: releaseKeyboardGrab
    } = useKeyboardGrab<DateTime>({
        isDraggable: canDrag,
        itemId: toRef(() => id ?? null),
        grabbedId: dragContext?.grabbedId ?? ref<string | number | null>(null),
        onGrab() {
            dragContext?.onItemKeyboardGrab(id as string | number, date);
            return date;
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
        isClickable.value && $style.isClickable,
        canDrag.value && $style.isDraggable,
        isGrabbed.value && $style.isGrabbed,
        allDay && $style.isAllDay
    ));

    function onDragStart(evt: DragEvent): void {
        if (!canDrag.value || id == null || !dragContext) {
            return;
        }

        // Cancel any keyboard-grab when starting a pointer drag.
        if (isGrabbed.value) {
            dragContext.onItemKeyboardCancel();
            releaseKeyboardGrab();
        }

        dragContext.onItemDragStart(id, date, evt);
    }

    function onDragEnd(): void {
        if (id == null) {
            return;
        }

        dragContext?.onItemDragEnd(id);
    }

    onMounted(() => {
        if (root.value && id != null) {
            dragContext?.registerItem(root.value, id);
        }
    });

    onBeforeUnmount(() => {
        if (root.value) {
            dragContext?.unregisterItem(root.value);
        }
    });

    watch(() => id, (newId, oldId) => {
        if (!root.value) {
            return;
        }

        if (oldId != null) {
            dragContext?.unregisterItem(root.value);
        }

        if (newId != null) {
            dragContext?.registerItem(root.value, newId);
        }
    });
</script>
