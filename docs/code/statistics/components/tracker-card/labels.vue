<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerCard
            title="Onboarding"
            subtitle="3 of 5 steps completed"
            icon="user-plus"
            labels="bottom">
            <FluxStatisticsTrackerCardSegment
                label="Account"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Profile"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Team"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Billing"
                state="active"/>

            <FluxStatisticsTrackerCardSegment label="Done"/>
        </FluxStatisticsTrackerCard>

        <FluxStatisticsTrackerCard
            title="Onboarding"
            subtitle="3 of 5 steps completed"
            icon="user-plus"
            labels="top">
            <FluxStatisticsTrackerCardSegment
                label="Account"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Profile"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Team"
                state="done"/>

            <FluxStatisticsTrackerCardSegment
                label="Billing"
                state="active"/>

            <FluxStatisticsTrackerCardSegment label="Done"/>
        </FluxStatisticsTrackerCard>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment } from '@flux-ui/statistics';
</script>
