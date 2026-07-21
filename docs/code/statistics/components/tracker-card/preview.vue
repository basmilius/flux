<template>
    <Preview>
        <FluxStatisticsTrackerCard
            style="width: 100%; max-width: 450px"
            title="Your Order is on the Way"
            subtitle="2 shipments · Arriving tomorrow"
            icon="truck">
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="done"/>
            <FluxStatisticsTrackerCardSegment state="active"/>
            <FluxStatisticsTrackerCardSegment/>
        </FluxStatisticsTrackerCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment } from '@flux-ui/statistics';
</script>
