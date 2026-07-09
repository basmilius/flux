<template>
    <FluxLayerPane style="max-width: 390px">
        <FluxClickablePaneHeader
            icon="folder"
            title="Documents"
            sub-title="24 files"
            href="#"/>

        <FluxPane>
            <FluxPaneBody>
                Open the documents section to manage your files.
            </FluxPaneBody>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePaneHeader, FluxLayerPane, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
