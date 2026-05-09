<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxLayerPane>
            <FluxPaneHeader
                icon="file-lines"
                title="Resources"/>

            <FluxPane>
                <FluxPaneBody>Browse documentation, release notes and developer guides for your team.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="primary">
            <FluxPaneHeader
                icon="sparkles"
                title="Upgrade to Pro"/>

            <FluxPane>
                <FluxPaneBody>Unlock advanced analytics, unlimited seats and priority support.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="info">
            <FluxPaneHeader
                icon="circle-info"
                title="Update available"/>

            <FluxPane>
                <FluxPaneBody>Version 2.5.0 is ready to install. Restart the application to apply the update.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="success">
            <FluxPaneHeader
                icon="circle-check"
                title="Backup completed"/>

            <FluxPane>
                <FluxPaneBody>Your latest backup finished successfully and is stored securely in the cloud.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="warning">
            <FluxPaneHeader
                icon="hourglass-clock"
                title="Scheduled maintenance"/>

            <FluxPane>
                <FluxPaneBody>The platform will be unavailable on Sunday between 02:00 and 04:00 UTC.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>

        <FluxLayerPane color="danger">
            <FluxPaneHeader
                icon="circle-exclamation"
                title="Payment failed"/>

            <FluxPane>
                <FluxPaneBody>We could not process your last invoice. Update your billing details to avoid service interruption.</FluxPaneBody>
            </FluxPane>
        </FluxLayerPane>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';
</script>
