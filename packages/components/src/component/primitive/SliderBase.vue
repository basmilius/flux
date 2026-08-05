<template>
    <div
        ref="root"
        :class="clsx(
            $style.slider,
            direction === 'vertical' && $style.isVertical,
            disabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        :style="overdragStyle"
        :aria-disabled="disabled ? true : undefined"
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
    import { unwrapElement } from '@basmilius/common';
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, type CSSProperties, onUnmounted, ref, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import { useElasticOverdrag } from '~flux/components/composable/private';
    import FluxTicks from '../FluxTicks.vue';
    import $style from '~flux/components/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
        update: [number];
    }>();

    const {
        direction = 'horizontal',
        disabled: componentDisabled
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly disabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    }>();

    const rootRef = useTemplateRef('root');
    const isDragging = ref(false);
    const pointerId = ref<number | null>(null);

    const disabled = useDisabled(toRef(() => componentDisabled));

    const {
        scale: overdragScale,
        transformOrigin: overdragOrigin,
        update: updateOverdrag,
        reset: resetOverdrag,
        dispose: disposeOverdrag
    } = useElasticOverdrag({direction: () => direction});

    const overdragStyle = computed<CSSProperties>(() => ({
        '--slider-overdrag-scale': unref(overdragScale),
        '--slider-overdrag-origin': unref(overdragOrigin)
    }));

    onUnmounted(() => {
        disposeOverdrag();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function onPointerDown(evt: PointerEvent): void {
        if (unref(disabled) || evt.button !== 0) {
            return;
        }

        const root = unwrapElement(rootRef);

        isDragging.value = true;
        pointerId.value = evt.pointerId;
        emit('dragging', true);
        root?.setPointerCapture?.(evt.pointerId);
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointercancel', onPointerUp, {passive: true});
        document.addEventListener('pointerup', onPointerUp, {passive: true});
        onPointerMove(evt);
    }

    function onPointerMove(evt: PointerEvent): void {
        const root = unwrapElement(rootRef);

        if (!unref(isDragging) || !root) {
            return;
        }

        const rect = root.getBoundingClientRect();
        const vertical = direction === 'vertical';
        const size = vertical ? rect.height : rect.width;

        if (size <= 0) {
            return;
        }

        const coord = vertical ? evt.clientY : evt.clientX;
        const start = vertical ? rect.top : rect.left;

        // Bottom is the minimum when vertical, so invert: dragging up raises the value.
        const fraction = vertical
            ? 1 - (coord - start) / size
            : (coord - start) / size;

        emit('update', Math.max(0, Math.min(1, fraction)));
        updateOverdrag(coord, start, start + size);
        evt.preventDefault();
    }

    function onPointerUp(): void {
        const root = unwrapElement(rootRef);

        if (pointerId.value !== null) {
            root?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        isDragging.value = false;
        emit('dragging', false);
        resetOverdrag();
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    }
</script>
