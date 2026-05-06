<template>
    <FluxFlex
        direction="horizontal"
        :gap="6"
        wrap="wrap">
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
