<template>
    <Preview>
        <FluxPane style="width: 100%">
            <FluxPaneBody>
                <FluxFlex :gap="9">
                    <PreviewColumn>One</PreviewColumn>
                    <PreviewColumn>Two</PreviewColumn>
                    <PreviewColumn>Three</PreviewColumn>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
