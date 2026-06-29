<template>
    <FluxFlex
        direction="vertical"
        :gap="6"
        role="group">
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
