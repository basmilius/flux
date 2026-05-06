<template>
    <FluxFlex :gap="6">
        <FluxChip
            icon-leading="bolt"
            label="Releases"/>

        <FluxChip
            icon-leading="gear"
            label="Builds"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxChip, FluxFlex } from '@flux-ui/components';
</script>
