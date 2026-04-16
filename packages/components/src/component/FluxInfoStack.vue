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
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): any;
    }>();
</script>
