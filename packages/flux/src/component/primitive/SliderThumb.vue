<template>
    <button
        :class="clsx(
            $style.sliderThumb,
            disabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        :style="{
            left: `${position * 100}%`
        }"
        :aria-disabled="disabled ? true : undefined"
        :tabindex="disabled ? -1 : 0"
        type="button"
        @keydown="onKeyDown"
        @pointerdown="$emit('grab', $event)"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { toRef, unref } from 'vue';
    import { useDisabled } from '$flux/composable';
    import $style from '$flux/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        decrement: [];
        grab: [PointerEvent];
        increment: [];
    }>();

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(disabled)) {
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
