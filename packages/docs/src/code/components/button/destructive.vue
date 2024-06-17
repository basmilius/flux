<template>
    <FluxButtonStack>
        <FluxDestructiveButton label="Disable"/>

        <FluxDestructiveButton
            icon-before="lock"
            label="Lock account"/>

        <FluxDestructiveButton
            icon-after="circle-arrow-down"
            label="Downgrade"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDestructiveButton } from '@basmilius/flux';
</script>
