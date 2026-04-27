<template>
    <FluxButtonStack>
        <FluxPrimaryLinkButton
            icon-leading="circle-plus"
            label="Button"/>

        <FluxPrimaryLinkButton
            icon-trailing="angle-right"
            label="Button"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryLinkButton } from '@flux-ui/components';
</script>
