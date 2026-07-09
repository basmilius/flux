<template>
    <FluxLayerPane>
        <FluxPaneHeader title="Quick Actions"/>

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
    import { FluxButtonStack, FluxDestructiveButton, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
</script>
