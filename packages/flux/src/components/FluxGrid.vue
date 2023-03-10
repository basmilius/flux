<template>
    <div class="flux-grid">
        <slot/>
    </div>
</template>

<script lang="ts" setup>
    export interface Props {
        readonly columns?: number;
    }

    withDefaults(defineProps<Props>(), {
        columns: 12
    });
</script>

<style lang="scss">
    .flux-grid {
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(v-bind(columns), 1fr);
    }
</style>
