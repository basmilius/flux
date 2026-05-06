<template>
    <FluxFlex :gap="9">
        <FluxFlexItem :basis="80">
            <PreviewColumn>80px</PreviewColumn>
        </FluxFlexItem>

        <FluxFlexItem :grow="1">
            <PreviewColumn>Grows to fill</PreviewColumn>
        </FluxFlexItem>

        <FluxFlexItem basis="25%">
            <PreviewColumn>25%</PreviewColumn>
        </FluxFlexItem>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxFlexItem } from '@flux-ui/components';
</script>
