<template>
    <FluxFlex
        direction="vertical"
        :gap="18">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
