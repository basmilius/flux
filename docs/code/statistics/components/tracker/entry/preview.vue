<template>
    <Preview>
        <FluxStatisticsTracker style="width: 100%; max-width: 450px">
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
            </FluxStatisticsTrackerEntry>

            <FluxStatisticsTrackerEntry
                icon="message"
                title="Jane Cooper"
                description="left a note"
                when="Mar 10, 2026 · 10:42 am"/>

            <FluxStatisticsTrackerEntry
                title="Order created"
                when="Mar 8, 2026 · 09:12 am"/>
        </FluxStatisticsTracker>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry } from '@flux-ui/statistics';
</script>
