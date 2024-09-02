<template>
    <FluxStack
        axis="horizontal"
        :gap="3"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';
</script>
