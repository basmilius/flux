<template>
    <FluxButtonStack>
        <FluxSecondaryLinkButton
            icon-leading="circle-plus"
            label="Button"/>

        <FluxSecondaryLinkButton
            icon-trailing="angle-right"
            label="Button"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryLinkButton } from '@flux-ui/components';
</script>
