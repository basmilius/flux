<template>
    <button
        :class="clsx(
            $style.coordinatePickerThumb,
            disabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        :style="{
            top: `${position[1] * 100}%`,
            left: `${position[0] * 100}%`
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
    import { useDisabled } from '@/composable';
    import $style from '@/css/component/primitive/CoordinatePicker.module.scss';

    const emit = defineEmits<{
        decrement: [boolean, boolean];
        grab: [PointerEvent];
        increment: [boolean, boolean];
    }>();

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: [number, number];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(disabled)) {
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
