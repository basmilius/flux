<template>
    <flux-stack
        axis="vertical"
        :gap="18">
        <slot/>
    </flux-stack>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '.';
</script>
