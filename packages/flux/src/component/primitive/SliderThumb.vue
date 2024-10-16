<template>
    <button
        :class="clsx(
            $style.sliderThumb,
            isDisabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        :style="{
            left: `${position * 100}%`
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
    import $style from '@/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        decrement: [];
        grab: [PointerEvent];
        increment: [];
    }>();

    const {
        isDisabled
    } = defineProps<{
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: number;
    }>();

    function onKeyDown(evt: KeyboardEvent): void {
        if (isDisabled) {
            return;
        }

        switch (evt.key) {
            case 'ArrowDown':
            case 'ArrowLeft':
                emit('decrement');
                break;

            case 'ArrowUp':
            case 'ArrowRight':
                emit('increment');
                break;

            default:
                return;
        }

        evt.preventDefault();
    }
</script>
