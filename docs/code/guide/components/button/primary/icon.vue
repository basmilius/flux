<template>
    <FluxButtonStack>
        <FluxPrimaryButton
            icon-leading="circle-check"
            label="Button"/>

        <FluxPrimaryButton
            icon-trailing="circle-check"
            label="Button"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton } from '@flux-ui/components';
</script>
