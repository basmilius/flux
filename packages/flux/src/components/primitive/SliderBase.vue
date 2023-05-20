<template>
    <div
        ref="rootRef"
        class="flux-slider"
        :class="{
            'is-disabled': isDisabled,
            'is-dragging': isDragging
        }"
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
    import { nextTick, onMounted, onUnmounted, ref, toRefs, unref, watch } from 'vue-demi';
    import { unrefElement } from '@/helpers';
    import FluxTicks from '../FluxTicks.vue';

    export interface Emits {
        (e: 'dragging', is: boolean): void;

        (e: 'update', value: number): void;
    }

    export interface Props {
        readonly isDisabled?: boolean;
        readonly isDragging?: boolean;
        readonly isTicksVisible?: boolean;
        readonly max: number;
        readonly min: number;
        readonly step: number;
    }

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
        nextTick(() => onPointerMove(evt));
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

<style lang="scss">
    .flux-slider {
        position: relative;
        display: flex;
        margin: 6px;
        flex-flow: column;
        gap: 9px;
        touch-action: pan-y;

        &.is-disabled {
            cursor: not-allowed;
        }

        &.is-dragging {
            cursor: grabbing;
        }
    }
</style>
