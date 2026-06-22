<template>
    <FluxFlex direction="vertical">
        <FluxText>Default foreground</FluxText>
        <FluxText color="muted">Muted secondary text</FluxText>
        <FluxText color="prominent">Prominent text</FluxText>
        <FluxText color="primary">Primary</FluxText>
        <FluxText color="danger">Danger</FluxText>
        <FluxText color="success">Success</FluxText>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxText } from '@flux-ui/components';
</script>
