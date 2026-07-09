<template>
    <FluxLayerPane>
        <FluxPaneHeader title="Resources"/>

        <FluxPane>
            <FluxPaneBody>Documentation</FluxPaneBody>
        </FluxPane>

        <FluxPane>
            <FluxPaneBody>Changelog</FluxPaneBody>
        </FluxPane>

        <FluxPaneFooter>v2.4.0</FluxPaneFooter>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader } from '@flux-ui/components';
</script>
