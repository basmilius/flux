<template>
    <div
        ref="rootRef"
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
    import { onMounted, onUnmounted, ref, toRefs, unref, watch } from 'vue';
    import { unrefElement } from '@/util';
    import FluxTicks from '../FluxTicks.vue';
    import styles from '@/css/component/Form.module.scss';

    export type Emits = {
        dragging: [boolean];
        update: [number];
    };

    export type Props = {
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    };

    const emit = defineEmits<Emits>();
    const props = defineProps<Props>();
    const {isDisabled, isDragging} = toRefs(props);

    const rootRef = ref<HTMLDivElement>();

    onMounted(() => {
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, {passive: true});
    });

    onUnmounted(() => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    });

    function onPointerDown(evt: PointerEvent): void {
        if (unref(isDisabled)) {
            return;
        }

        emit('dragging', true);
        requestAnimationFrame(() => onPointerMove(evt));
    }

    function onPointerMove(evt: PointerEvent): void {
        const root = unrefElement(rootRef);

        if (!isDragging.value || !root) {
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

    watch(isDragging, isDragging => emit('dragging', isDragging));
</script>
