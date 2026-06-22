<template>
    <FluxFlex direction="vertical">
        <FluxText :weight="400">Regular — 400</FluxText>
        <FluxText :weight="500">Medium — 500</FluxText>
        <FluxText :weight="600">Semibold — 600</FluxText>
        <FluxText :weight="700">Bold — 700</FluxText>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxText } from '@flux-ui/components';
</script>
