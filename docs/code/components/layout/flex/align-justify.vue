<template>
    <FluxFlex
        align="center"
        :gap="9"
        justify="center"
        style="height: 180px; width: 100%">
        <PreviewColumn>Centered</PreviewColumn>
        <PreviewColumn>Both axes</PreviewColumn>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
</script>
