<template>
    <FluxStack
        axis="vertical"
        :gap="6">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): any;
    }>();
</script>
