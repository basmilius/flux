<template>
    <flux-stack
        axis="horizontal"
        :gap="6">
        <slot/>
    </flux-stack>
</template>

<script
    lang="ts"
    setup>
    import { FluxStack } from '.';
</script>
