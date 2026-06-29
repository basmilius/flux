<template>
    <div
        ref="root"
        :class="clsx(
            $style.slider,
            disabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
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
    import { unrefTemplateElement } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { onUnmounted, ref, toRef, unref, useTemplateRef } from 'vue';
    import { useDisabled } from '~flux/components/composable';
    import FluxTicks from '../FluxTicks.vue';
    import $style from '~flux/components/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
        update: [number];
    }>();

    const {
        disabled: componentDisabled
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
    const rootRef = useTemplateRef('root');

    const isDragging = ref(false);
    const pointerId = ref<number | null>(null);

    function onPointerDown(evt: PointerEvent): void {
        if (unref(disabled) || evt.button !== 0) {
            return;
        }

        const root = unrefTemplateElement(rootRef);

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
        const root = unrefTemplateElement(rootRef);

        if (!unref(isDragging) || !root) {
            return;
        }

        let {left, width} = root.getBoundingClientRect();
        left += 6; // margin.
        width -= 12; // margin times two.

        if (width <= 0) {
            return;
        }

        emit('update', Math.max(0, Math.min(1, (evt.clientX - left) / width)));
        evt.preventDefault();
    }

    function onPointerUp(): void {
        const root = unrefTemplateElement(rootRef);

        if (pointerId.value !== null) {
            root?.releasePointerCapture?.(pointerId.value);
            pointerId.value = null;
        }

        isDragging.value = false;
        emit('dragging', false);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    }

    onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointercancel', onPointerUp);
        document.removeEventListener('pointerup', onPointerUp);
    });
</script>
