<template>
    <FluxStack
        axis="horizontal"
        :gap="6">
        <FluxChip
            icon-before="bolt"
            label="Releases"/>

        <FluxChip
            icon-before="gear"
            label="Builds"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip, FluxStack } from '@basmilius/flux';
</script>
