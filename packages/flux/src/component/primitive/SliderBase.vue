<template>
    <div
        ref="root"
        :class="clsx(
            $style.slider,
            disabled && $style.isDisabled,
            isDragging && $style.isDragging
        )"
        role="slider"
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
    import { unrefTemplateElement } from '@basmilius/flux-internals';
    import { clsx } from 'clsx';
    import { onMounted, onUnmounted, toRef, unref, useTemplateRef, watch } from 'vue';
    import { useDisabled } from '$flux/composable';
    import FluxTicks from '$flux//component/FluxTicks.vue';
    import $style from '$flux/css/component/primitive/Slider.module.scss';

    const emit = defineEmits<{
        dragging: [boolean];
        update: [number];
    }>();

    const {
        disabled: componentDisabled,
        isDragging
    } = defineProps<{
        readonly disabled?: boolean;
        readonly isDragging?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    }>();

    const disabled = useDisabled(toRef(() => componentDisabled));
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
        if (unref(disabled)) {
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
