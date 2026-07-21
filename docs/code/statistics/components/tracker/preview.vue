<template>
    <Preview>
        <FluxStatisticsTracker style="width: 100%; max-width: 450px">
            <FluxStatisticsTrackerEntry
                icon="message"
                title="Jane Cooper"
                description="left a note"
                when="Mar 10, 2026 · 10:42 am">
                <FluxPane>
                    <FluxPaneBody>
                        Please double-check the shipment packaging.
                    </FluxPaneBody>
                </FluxPane>
            </FluxStatisticsTrackerEntry>

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

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam earum facilis fugiat in.

                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep
                        state="done"
                        label="Carrier: Royal Mail (Standard)"/>

                    <FluxStatisticsTrackerStep
                        state="done"
                        label="Shipping label generated"/>

                    <FluxStatisticsTrackerStep
                        state="active"
                        label="Packing in progress"/>
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTrackerEntry>

            <FluxStatisticsTrackerEntry
                color="primary"
                icon="truck"
                title="Shipment 2">
                <template #end>
                    <FluxBadge
                        colored
                        color="primary"
                        label="In Progress"/>
                </template>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque laboriosam, libero molestias nulla.

                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep
                        state="done"
                        label="Carrier: Royal Mail (Standard)"/>

                    <FluxStatisticsTrackerStep label="Shipping label generating"/>
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTrackerEntry>
        </FluxStatisticsTracker>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
</script>
