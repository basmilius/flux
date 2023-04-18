<template>
    <button
        class="flux-slider-thumb"
        :class="{
            'is-dragging': isDragging
        }"
        @keydown="onKeyDown"
        @pointerdown="$emit('grab', $event)"/>
</template>

<script
    lang="ts"
    setup>
    export interface Emits {
        (e: 'decrement'): void;

        (e: 'grab', evt: PointerEvent): void;

        (e: 'increment'): void;
    }

    export interface Props {
        readonly isDragging?: boolean;
        readonly position: number;
    }

    const emit = defineEmits<Emits>();
    defineProps<Props>();

    function onKeyDown(evt: KeyboardEvent): void {
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

<style lang="scss">
    @use '../../scss/mixin' as flux;

    .flux-slider-thumb {
        position: absolute;
        top: 50%;
        left: calc(v-bind(position) * 100%);
        height: 24px;
        width: 24px;
        background: rgb(var(--gray-0));
        background-clip: padding-box;
        border: 1px solid rgb(var(--gray-11) / .05);
        border-radius: 99px;
        box-shadow: var(--shadow-sm);
        cursor: grab;
        outline: 0;
        translate: -50% -50%;

        @include flux.focus-ring-transition(2px);

        &:hover {
            background-color: rgb(var(--gray-2));
        }

        &.is-dragging {
            box-shadow: var(--shadow-md);
            cursor: grabbing;
        }
    }
</style>
