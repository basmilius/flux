<template>
    <flux-stack
        axis="vertical"
        :gap="21">
        <slot/>
    </flux-stack>
</template>

<script
    setup
    lang="ts">
    import FluxStack from './FluxStack.vue';
</script>
