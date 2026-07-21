<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerCard
            color="success"
            title="Deployment"
            subtitle="Production · Build 482"
            icon="rocket">
            <FluxStatisticsTrackerCardSegment
                color="success"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                color="success"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                color="success"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                color="success"
                state="done"/>
        </FluxStatisticsTrackerCard>

        <FluxStatisticsTrackerCard
            color="warning"
            title="Storage upgrade"
            subtitle="Waiting for approval"
            icon="database">
            <FluxStatisticsTrackerCardSegment
                color="warning"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                color="warning"
                state="active"/>

            <FluxStatisticsTrackerCardSegment/>
            <FluxStatisticsTrackerCardSegment/>
        </FluxStatisticsTrackerCard>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment } from '@flux-ui/statistics';
</script>
