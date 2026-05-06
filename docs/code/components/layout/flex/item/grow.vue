<template>
    <FluxFlex :gap="9">
        <PreviewColumn>A</PreviewColumn>

        <FluxFlexItem :grow="1">
            <PreviewColumn>B (grow=1)</PreviewColumn>
        </FluxFlexItem>

        <FluxFlexItem :grow="2">
            <PreviewColumn>C (grow=2)</PreviewColumn>
        </FluxFlexItem>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxFlexItem } from '@flux-ui/components';
</script>
