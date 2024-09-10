<template>
    <div
        ref="root"
        :class="clsx(
            styles.slider,
            isDisabled && styles.isDisabled,
            isDragging && styles.isDragging
        )"
        role="slider"
        @pointerdown="onPointerDown">
        <FluxTicks
            v-if="isTicksVisible"
            :lower="min"
            :upper="max"/>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import { onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
    import { unrefTemplateElement } from '@/util';
    import FluxTicks from '../FluxTicks.vue';
    import styles from '@/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
        update: [number];
    }>();

    const {
        isDisabled,
        isDragging
    } = defineProps<{
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    }>();

    const rootRef = useTemplateRef('root');

    onMounted(() => {
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, {passive: true});
    });

    onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function onPointerDown(evt: PointerEvent): void {
        if (isDisabled) {
            return;
        }

        emit('dragging', true);
        requestAnimationFrame(() => onPointerMove(evt));
    }

    function onPointerMove(evt: PointerEvent): void {
        const root = unrefTemplateElement(rootRef);

        if (!isDragging || !root) {
            return;
        }

        let {left, width} = root.getBoundingClientRect();
        left += 6; // margin.
        width -= 12; // margin times two.

        emit('update', Math.max(0, Math.min(1, (evt.pageX - left) / width)));
        evt.preventDefault();
    }

    function onPointerUp(): void {
        emit('dragging', false);
    }

    watch(() => isDragging, () => emit('dragging', isDragging));
</script>
