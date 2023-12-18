<template>
    <div
        class="flux-gridlines"
        :style="{
            '--size': `${size}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly size: number;
    }

    withDefaults(defineProps<Props>(), {
        size: 30
    });
</script>

<style lang="scss">
    .flux-gridlines {
        --grid: linear-gradient(to bottom, transparent calc(100% - 1px), black calc(100% - 1px)), linear-gradient(to right, transparent calc(100% - 1px), black calc(100% - 1px));

        background: rgb(var(--gray-3));

        -webkit-mask-image: var(--grid);
        -webkit-mask-position: top left;
        -webkit-mask-size: var(--size) var(--size);
        mask-image: var(--grid);
        mask-position: top left;
        mask-size: var(--size) var(--size);
    }
</style>
