<template>
    <FluxStack
        axis="horizontal"
        :gap="6"
        is-wrapping>
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
