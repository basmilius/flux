<template>
    <FluxStack
        axis="vertical"
        :gap="21">
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
