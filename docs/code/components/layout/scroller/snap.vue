<template>
    <FluxScroller
        direction="horizontal"
        snap="mandatory"
        snap-align="start"
        style="width: 100%; padding: 9px">
        <FluxFlex :gap="9">
            <PreviewColumn
                v-for="i in 8"
                :key="i"
                style="flex: 0 0 200px; height: 120px">
                Slide {{ i }}
            </PreviewColumn>
        </FluxFlex>
    </FluxScroller>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxScroller } from '@flux-ui/components';
</script>
