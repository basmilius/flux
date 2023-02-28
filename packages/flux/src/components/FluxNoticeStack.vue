<template>
    <flux-stack
        axis="vertical"
        :gap="6">
        <slot/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '.';
</script>
