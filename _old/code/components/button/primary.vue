<template>
    <FluxButtonStack>
        <FluxPrimaryButton label="Buy"/>

        <FluxPrimaryButton
            icon-before="check-circle"
            label="Save"/>

        <FluxPrimaryButton
            icon-after="circle-arrow-right"
            label="Enter"/>

        <FluxPrimaryButton
            is-loading
            label="Update"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPrimaryButton } from '@basmilius/flux';
</script>
