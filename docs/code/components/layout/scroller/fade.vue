<template>
    <FluxScroller
        has-fade
        style="height: 240px; width: 100%; padding: 18px">
        <FluxFlex
            direction="vertical"
            :gap="6">
            <PreviewColumn
                v-for="i in 30"
                :key="i">
                Row {{ i }}
            </PreviewColumn>
        </FluxFlex>
    </FluxScroller>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxScroller } from '@flux-ui/components';
</script>
