<template>
    <FluxButtonStack>
        <FluxDestructiveButton
            icon-leading="circle-check"
            label="Button"/>

        <FluxDestructiveButton
            icon-trailing="circle-check"
            label="Button"/>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDestructiveButton } from '@flux-ui/components';
</script>
