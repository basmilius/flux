<template>
    <FluxScroller
        direction="horizontal"
        style="width: 100%; padding: 9px">
        <FluxFlex :gap="9">
            <PreviewColumn
                v-for="i in 12"
                :key="i"
                style="flex: 0 0 160px">
                Card {{ i }}
            </PreviewColumn>
        </FluxFlex>
    </FluxScroller>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxScroller } from '@flux-ui/components';
</script>
