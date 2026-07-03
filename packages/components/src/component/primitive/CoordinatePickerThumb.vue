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
        :aria-label="label"
        aria-roledescription="2D slider"
        :tabindex="disabled ? -1 : 0"
        type="button"
        @keydown="onKeyDown"/>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { computed, toRef, unref } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import $style from '~flux/components/css/component/primitive/CoordinatePicker.module.scss';

    const emit = defineEmits<{
        decrement: [boolean, boolean];
        increment: [boolean, boolean];
    }>();

    const {
        ariaLabel,
        disabled: componentDisabled,
        position
    } = defineProps<{
        readonly ariaLabel?: string;
        readonly disabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: [number, number];
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));

    const label = computed(() => {
        const coordinates = `X: ${Math.round(position[0] * 100)}%, Y: ${Math.round(position[1] * 100)}%`;

        return ariaLabel ? `${ariaLabel}, ${coordinates}` : coordinates;
    });

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
