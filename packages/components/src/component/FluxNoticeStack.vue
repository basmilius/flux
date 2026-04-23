<template>
    <FluxStack
        direction="vertical"
        :gap="6">
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
