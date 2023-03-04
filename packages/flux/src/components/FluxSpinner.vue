<template>
    <svg
        class="flux-spinner"
        :style="{'--size': `${size}px`}"
        viewBox="0 0 24 24">
        <circle
            class="flux-spinner-track"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"/>

        <circle
            class="flux-spinner-effect"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"
            stroke-dasharray="21 45"
            stroke-dashoffset="30"
            stroke-linecap="round"/>

        <circle
            class="flux-spinner-value"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"
            stroke-dasharray="21 45"
            stroke-dashoffset="30"
            stroke-linecap="round"/>
    </svg>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly size?: number;
    }

    withDefaults(defineProps<Props>(), {
        size: 30
    });
</script>

<style lang="scss">
    .flux-spinner {
        display: inline-block;
        height: 1em;
        width: 1em;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: var(--size);

        &-track {
            stroke: var(--spinner-track);
        }

        &-effect,
        &-value {
            stroke: var(--spinner-value);
            animation: spinner 1s var(--swift-out) infinite;
            transform-origin: center;
        }

        &-effect {
            opacity: .25;
            animation-delay: -.85s;
        }
    }

    @keyframes spinner {
        to {
            rotate: 1turn;
        }
    }
</style>
