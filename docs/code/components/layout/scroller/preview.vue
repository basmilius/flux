<template>
    <Preview>
        <FluxPane style="width: 100%">
            <FluxScroller
                has-fade
                style="height: 200px; padding: 18px">
                <FluxFlex
                    direction="vertical"
                    :gap="6">
                    <PreviewColumn
                        v-for="i in 12"
                        :key="i">
                        Item {{ i }}
                    </PreviewColumn>
                </FluxFlex>
            </FluxScroller>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxScroller } from '@flux-ui/components';
</script>
