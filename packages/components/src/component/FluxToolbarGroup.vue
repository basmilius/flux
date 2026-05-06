<template>
    <FluxFlex
        :gap="3"
        tag="nav">
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
