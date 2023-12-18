<template>
    <div class="flux-slider-track">
        <div
            class="flux-slider-track-value"
            :style="{
                left: `${percentageLower * 100}%`,
                width: `${(percentageUpper - percentageLower) * 100}%`
            }"/>
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
            height: inherit;
            background: rgb(var(--primary-7));
            border-radius: inherit;
        }
    }

    .flux-slider.is-disabled .flux-slider-track-value {
        background: rgb(var(--gray-5));
    }
</style>
