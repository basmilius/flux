<template>
    <Preview>
        <FluxStatisticsTrackerCard
            style="width: 100%; max-width: 450px"
            title="Fulfillment"
            subtitle="Packed 3 of 8 items"
            icon="box">
            <FluxStatisticsTrackerCardSegment
                label="Picked"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Packing"
                state="active"
                :min="0"
                :max="8"
                :value="3"/>

            <FluxStatisticsTrackerCardSegment label="Shipped"/>
        </FluxStatisticsTrackerCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment } from '@flux-ui/statistics';
</script>
