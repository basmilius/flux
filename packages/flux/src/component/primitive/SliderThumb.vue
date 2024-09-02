<template>
    <button
        :class="clsx(
            styles.sliderThumb,
            isDisabled && styles.isDisabled,
            isDragging && styles.isDragging
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
    import { toRefs, unref } from 'vue';
    import styles from '@/css/component/Form.module.scss';

    export type Emits = {
        decrement: [];
        grab: [PointerEvent];
        increment: [];
    };

    export type Props = {
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly position: number;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isDisabled} = toRefs(props);

    function onKeyDown(evt: KeyboardEvent): void {
        if (unref(isDisabled)) {
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
