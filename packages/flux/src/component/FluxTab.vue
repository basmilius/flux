<template>
    <div class="flux-tab">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { IconNames } from '@/data';

    export interface Props {
        readonly icon?: IconNames;
        readonly label?: string;
    }

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-tab {
        position: relative;
    }
</style>
