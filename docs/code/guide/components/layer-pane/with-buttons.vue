<template>
    <FluxLayerPane>
        <FluxLayerPaneSecondary>Quick Actions</FluxLayerPaneSecondary>

        <FluxPane>
            <FluxPaneBody>
                <FluxButtonStack direction="vertical">
                    <FluxSecondaryButton
                        is-filled
                        icon-leading="file-plus"
                        label="New document"/>

                    <FluxSecondaryButton
                        is-filled
                        icon-leading="upload"
                        label="Import file"/>

                    <FluxDestructiveButton
                        is-filled
                        icon-leading="trash"
                        label="Delete all"/>
                </FluxButtonStack>
            </FluxPaneBody>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxDestructiveButton, FluxLayerPane, FluxLayerPaneSecondary, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';
</script>
