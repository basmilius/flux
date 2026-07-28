<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxReadMore :lines="2">
                Deployments run on a rolling strategy with two replicas kept warm at all times. A release is promoted only after the smoke suite passes against the canary, and the previous revision stays available for an instant rollback during the first hour. Alerts route to the on-call channel, with a paging escalation after ten minutes without acknowledgement.
            </FluxReadMore>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxReadMore } from '@flux-ui/components';
</script>
