<template>
    <FluxStatisticsTracker style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerEntry
            icon="message"
            description="left a note"
            when="Mar 10, 2026 · 10:42 am">
            <template #start>
                <FluxAvatar
                    fallback-initials="JC"
                    :size="24"/>
            </template>
        </FluxStatisticsTrackerEntry>

        <FluxStatisticsTrackerEntry
            color="primary"
            icon="truck"
            title="Shipment 1"
            when="Mar 10, 2026 · 11:08 am">
            <template #end>
                <FluxBadge
                    colored
                    color="primary"
                    icon="box"
                    label="2 parcels"/>
            </template>
        </FluxStatisticsTrackerEntry>
    </FluxStatisticsTracker>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBadge } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry } from '@flux-ui/statistics';
</script>
