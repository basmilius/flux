<template>
    <FluxStack
        direction="horizontal"
        :gap="6">
        <FluxChip
            icon-leading="bolt"
            label="Releases"/>

        <FluxChip
            icon-leading="gear"
            label="Builds"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip, FluxStack } from '@flux-ui/flux';
</script>
