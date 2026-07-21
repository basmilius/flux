<template>
    <FluxFlex
        direction="vertical"
        :gap="21"
        style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerCard
            title="Your Order is on the Way"
            subtitle="2 shipments · Arriving tomorrow"
            icon="truck">
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="active"/>
            <FluxStatisticsTrackerCardSegment/>
        </FluxStatisticsTrackerCard>

        <FluxStatisticsTracker>
            <FluxStatisticsTrackerLabel label="Completed"/>

            <FluxStatisticsTrackerEntry
                color="success"
                icon="box"
                title="Order placed"
                when="Mar 8, 2026 · 09:12 am"/>

            <FluxStatisticsTrackerLabel label="In-progress"/>

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

            <FluxStatisticsTrackerLabel label="Up next"/>

            <FluxStatisticsTrackerEntry
                icon="house"
                title="Delivery"
                description="Tomorrow between 10:00 and 14:00"/>
        </FluxStatisticsTracker>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
</script>
