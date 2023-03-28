<template>
    <div class="flux-aspect-ratio">
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
    @layer component {
        .flux-aspect-ratio {
            position: relative;
            aspect-ratio: v-bind(aspectRatio);
            flex-shrink: 0;

            > * {
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
