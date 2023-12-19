<template>
    <div
        class="flux-aspect-ratio"
        :style="{
            aspectRatio
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        aspectRatio: number;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-aspect-ratio {
        position: relative;
        flex-shrink: 0;

        > * {
            height: 100%;
            width: 100%;
        }
    }
</style>
