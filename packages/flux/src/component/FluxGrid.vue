<template>
    <div
        class="flux-grid"
        :style="{
            '--gap': `${gap}px`,
            '--columns': columns
        }">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    export interface Props {
        readonly columns?: number;
        readonly gap?: number;
    }

    withDefaults(defineProps<Props>(), {
        columns: 12,
        gap: 30
    });
</script>

<style lang="scss">
    .flux-grid {
        display: grid;
        gap: var(--gap);
        grid-template-columns: repeat(var(--columns), 1fr);
    }
</style>
