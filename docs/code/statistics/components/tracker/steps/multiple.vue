<template>
    <FluxStatisticsTracker style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerEntry
            color="success"
            icon="check"
            title="Order placed">
            <FluxStatisticsTrackerSteps>
                <FluxStatisticsTrackerStep
                    state="done"
                    label="Payment authorized"/>

                <FluxStatisticsTrackerStep
                    state="done"
                    label="Invoice sent"/>
            </FluxStatisticsTrackerSteps>
        </FluxStatisticsTrackerEntry>

        <FluxStatisticsTrackerEntry
            color="primary"
            icon="box"
            title="Fulfillment">
            <FluxStatisticsTrackerSteps>
                <FluxStatisticsTrackerStep
                    state="done"
                    label="Items picked"/>

                <FluxStatisticsTrackerStep
                    state="active"
                    label="Packing in progress"/>
            </FluxStatisticsTrackerSteps>
        </FluxStatisticsTrackerEntry>
    </FluxStatisticsTracker>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
</script>
