<template>
    <FluxButtonStack>
        <FluxSecondaryButton label="Cancel"/>

        <FluxSecondaryButton
            icon-before="circle-arrow-up"
            label="Upgrade subscription"/>

        <FluxSecondaryButton
            icon-after="circle-arrow-right"
            label="Takeover"/>

        <FluxSecondaryButton
            is-loading
            label="Restore"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxSecondaryButton } from '@basmilius/flux';
</script>
