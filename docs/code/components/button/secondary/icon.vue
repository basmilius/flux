<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            icon-leading="xmark"
            label="Button"/>

        <FluxSecondaryButton
            icon-trailing="xmark"
            label="Button"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton } from '@flux-ui/components';
</script>
