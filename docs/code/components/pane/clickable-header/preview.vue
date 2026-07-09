<template>
    <Preview>
        <FluxLayerPane style="max-width: 390px">
            <FluxClickablePaneHeader
                icon="chart-line"
                title="Performance"
                sub-title="View detailed analytics"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>
                    Your revenue increased by 12% this period.
                </FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxClickablePaneHeader, FluxLayerPane, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
