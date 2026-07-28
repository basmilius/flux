<template>
    <Preview>
        <FluxStatisticsTracker style="width: 100%; max-width: 450px">
            <FluxStatisticsTrackerEntry
                color="primary"
                icon="truck"
                title="Shipment"
                description="Royal Mail (Standard)">
                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep
                        state="done"
                        label="Shipping label generated"/>

                    <FluxStatisticsTrackerStep
                        state="active"
                        label="Packing in progress"/>

                    <FluxStatisticsTrackerStep label="Handed to carrier"/>
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTrackerEntry>

            <FluxStatisticsTrackerEntry
                icon="box"
                title="Delivery"/>
        </FluxStatisticsTracker>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
</script>
