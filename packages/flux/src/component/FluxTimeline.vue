<template>
    <FluxStack
        class="flux-timeline"
        :gap="15">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';
</script>
