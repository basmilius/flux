<template>
    <button
        :class="clsx(
            $style.coordinatePickerThumb,
            isDisabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        :style="{
            top: `${position[1] * 100}%`,
            left: `${position[0] * 100}%`
        }"
        :tabindex="isDisabled ? -1 : 0"
        type="button"
        @keydown="onKeyDown"
        @pointerdown="$emit('grab', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import $style from '@/css/component/primitive/CoordinatePicker.module.scss';

    const emit = defineEmits<{
        decrement: [boolean, boolean];
        grab: [PointerEvent];
        increment: [boolean, boolean];
    }>();

    const {
        isDisabled
    } = defineProps<{
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: [number, number];
    }>();

    function onKeyDown(evt: KeyboardEvent): void {
        if (isDisabled) {
            return;
        }

        switch (evt.key) {
            case 'ArrowUp':
                emit('decrement', false, true);
                break;

            case 'ArrowDown':
                emit('increment', false, true);
                break;

            case 'ArrowLeft':
                emit('decrement', true, false);
                break;

            case 'ArrowRight':
                emit('increment', true, false);
                break;

            default:
                return;
        }

        evt.preventDefault();
    }
</script>
