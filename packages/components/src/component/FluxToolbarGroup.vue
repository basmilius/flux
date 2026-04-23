<template>
    <FluxStack
        direction="horizontal"
        :gap="3"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
