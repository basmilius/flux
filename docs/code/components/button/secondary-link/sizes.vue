<template>
    <FluxButtonStack>
        <FluxSecondaryLinkButton
            label="Button"
            size="small"/>

        <FluxSecondaryLinkButton
            label="Button"
            size="medium"/>

        <FluxSecondaryLinkButton
            label="Button"
            size="large"/>

        <FluxSecondaryLinkButton
            label="Button"
            size="xl"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryLinkButton } from '@flux-ui/components';
</script>
