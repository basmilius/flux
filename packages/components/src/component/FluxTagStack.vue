<template>
    <FluxStack
        direction="horizontal"
        :gap="6"
        is-wrapping>
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
