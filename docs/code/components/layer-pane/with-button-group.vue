<template>
    <FluxLayerPane>
        <FluxPaneHeader title="Calendar">
            <template #after>
                <FluxButtonGroup>
                    <FluxSecondaryButton label="Day"/>

                    <FluxPrimaryButton label="Week"/>

                    <FluxSecondaryButton label="Month"/>
                </FluxButtonGroup>
            </template>
        </FluxPaneHeader>

        <FluxPane>
            <FluxPaneBody>Showing your schedule for this week.</FluxPaneBody>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
