<template>
    <Preview>
        <FluxStatisticsTracker style="width: 100%; max-width: 450px">
            <FluxStatisticsTrackerEntry
                color="primary"
                icon="box"
                title="Fulfillment">
                <template #end>
                    <FluxBadge
                        colored
                        color="primary"
                        label="In Progress"/>
                </template>

                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep
                        state="done"
                        label="Items picked"/>

                    <FluxStatisticsTrackerStep
                        state="active"
                        label="Packing in progress"/>

                    <FluxStatisticsTrackerStep label="Handed to carrier"/>
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTrackerEntry>
        </FluxStatisticsTracker>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
</script>
