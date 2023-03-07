<template>
    <svg
        class="flux-spinner"
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
    :root {
        --spinner-track: rgb(var(--gray-4));
        --spinner-value: rgb(var(--primary-7));
    }

    .flux-spinner {
        display: inline-block;
        height: 1em;
        width: 1em;
        flex-grow: 0;
        flex-shrink: 0;
        font-size: calc(v-bind(size) * 1px);

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
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(1turn);
        }
    }
</style>
