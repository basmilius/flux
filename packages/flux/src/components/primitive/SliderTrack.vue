<template>
    <div class="flux-slider-track">
        <div class="flux-slider-track-value"/>
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly percentageLower: number;
        readonly percentageUpper: number;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-slider-track {
        position: relative;
        height: 12px;
        background: rgb(var(--gray-3) / .75);
        border-radius: 99px;

        &-value {
            position: absolute;
            display: block;
            top: 0;
            left: calc(v-bind(percentageLower) * 100%);
            height: inherit;
            width: calc(v-bind(percentageUpper) * 100% - v-bind(percentageLower) * 100%);
            background: rgb(var(--primary-7));
            border-radius: inherit;
        }
    }
</style>
