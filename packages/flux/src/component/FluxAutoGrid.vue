<template>
    <div
        class="flux-auto-grid"
        :style="{
            '--min-column-width': minColumnWidth,
            gap: `${gap}px`
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly gap?: number;
        readonly minColumnWidth: number;
    }

    withDefaults(defineProps<Props>(), {
        gap: 30
    });
</script>

<style lang="scss">
    .flux-auto-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(var(--min-column-width) * 1px), 1fr));
    }
</style>
