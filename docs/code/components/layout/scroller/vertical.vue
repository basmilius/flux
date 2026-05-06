<template>
    <FluxScroller style="height: 200px; width: 100%; padding: 9px">
        <FluxFlex
            direction="vertical"
            :gap="6">
            <PreviewColumn
                v-for="i in 20"
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
