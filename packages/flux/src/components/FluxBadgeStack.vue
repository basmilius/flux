<template>
    <flux-stack
        axis="horizontal"
        :gap="6"
        is-wrapping>
        <slot/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import FluxStack from './FluxStack.vue';
</script>
