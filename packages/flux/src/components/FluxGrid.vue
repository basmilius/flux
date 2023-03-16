<template>
    <div class="flux-grid">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
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
        gap: calc(v-bind(gap) * 1px);
        grid-template-columns: repeat(v-bind(columns), 1fr);
    }
</style>
