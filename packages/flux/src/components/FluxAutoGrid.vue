<template>
    <div class="flux-auto-grid">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
    export interface Props {
        readonly gap?: number;
        readonly minColumnWidth: number;
    }

    withDefaults(defineProps<Props>(), {
        gap: 30
    });
</script>

<style lang="scss">
    @layer component {
        .flux-auto-grid {
            display: grid;
            gap: calc(v-bind(gap) * 1px);
            grid-template-columns: repeat(auto-fit, minmax(calc(v-bind(minColumnWidth) * 1px), 1fr));
        }
    }
</style>
