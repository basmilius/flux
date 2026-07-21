<template>
    <FluxStatisticsTracker style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerEntry
            color="success"
            icon="circle-check"
            title="Payment received">
            <template #end>
                <FluxBadge
                    colored
                    color="success"
                    label="Paid"/>
            </template>
        </FluxStatisticsTrackerEntry>

        <FluxStatisticsTrackerEntry
            color="warning"
            icon="hourglass-clock"
            title="Awaiting stock">
            <template #end>
                <FluxBadge
                    colored
                    color="warning"
                    label="On hold"/>
            </template>
        </FluxStatisticsTrackerEntry>

        <FluxStatisticsTrackerEntry
            color="danger"
            icon="circle-exclamation"
            title="Address could not be verified">
            <template #end>
                <FluxBadge
                    colored
                    color="danger"
                    label="Action needed"/>
            </template>
        </FluxStatisticsTrackerEntry>
    </FluxStatisticsTracker>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry } from '@flux-ui/statistics';
</script>
