<template>
    <FluxButtonStack>
        <FluxDestructiveButton
            label="Button"
            size="small"/>

        <FluxDestructiveButton
            label="Button"
            size="medium"/>

        <FluxDestructiveButton
            label="Button"
            size="large"/>

        <FluxDestructiveButton
            label="Button"
            size="xl"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDestructiveButton } from '@flux-ui/components';
</script>
