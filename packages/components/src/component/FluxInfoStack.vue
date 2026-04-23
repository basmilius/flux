<template>
    <FluxStack
        direction="vertical"
        :gap="18">
        <slot/>
    </FluxStack>
</template>

<script
    setup
    lang="ts">
    import type { VNode } from 'vue';
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
