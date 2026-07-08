<template>
    <FluxTimeline>
        <FluxTimelineItem
            when="9:00 AM"
            title="Standup">
            Daily sync with the team.
        </FluxTimelineItem>

        <FluxTimelineItem
            when="11:00 AM"
            title="Design review">
            Walked through the new dashboard layout.
        </FluxTimelineItem>

        <FluxTimelineItem
            when="2:00 PM"
            title="Release">
            Shipped version 2.4 to production.
        </FluxTimelineItem>
    </FluxTimeline>
</template>

<script
    setup
    lang="ts">
    import { FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
