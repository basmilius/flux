<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxLayerPane>
            <FluxClickablePaneHeader
                icon="file-lines"
                title="Resources"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>Browse documentation, release notes and developer guides for your team.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="primary">
            <FluxClickablePaneHeader
                icon="sparkles"
                title="Upgrade to Pro"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>Unlock advanced analytics, unlimited seats and priority support.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="info">
            <FluxClickablePaneHeader
                icon="circle-info"
                title="Update available"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>Version 2.5.0 is ready to install. Restart the application to apply the update.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="success">
            <FluxClickablePaneHeader
                icon="circle-check"
                title="Backup completed"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>Your latest backup finished successfully and is stored securely in the cloud.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="warning">
            <FluxClickablePaneHeader
                icon="hourglass-clock"
                title="Scheduled maintenance"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>The platform will be unavailable on Sunday between 02:00 and 04:00 UTC.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="danger">
            <FluxClickablePaneHeader
                icon="circle-exclamation"
                title="Payment failed"
                href="#"/>

            <FluxPane>
                <FluxPaneBody>We could not process your last invoice. Update your billing details to avoid service interruption.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxClickablePaneHeader, FluxFlex, FluxLayerPane, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
