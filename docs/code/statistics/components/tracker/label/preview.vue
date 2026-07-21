<template>
    <Preview>
        <FluxStatisticsTracker style="width: 100%; max-width: 450px">
            <FluxStatisticsTrackerLabel label="Completed"/>

            <FluxStatisticsTrackerEntry
                color="success"
                icon="circle-check"
                title="Order placed"
                when="Mar 8, 2026 · 09:12 am"/>

            <FluxStatisticsTrackerLabel
                color="primary"
                label="In-progress"/>

            <FluxStatisticsTrackerEntry
                color="primary"
                icon="truck"
                title="Shipment 1">
                <template #end>
                    <FluxBadge
                        colored
                        color="primary"
                        label="In Progress"/>
                </template>
            </FluxStatisticsTrackerEntry>
        </FluxStatisticsTracker>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel } from '@flux-ui/statistics';
</script>
