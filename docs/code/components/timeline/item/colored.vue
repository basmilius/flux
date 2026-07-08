<template>
    <FluxTimeline>
        <FluxTimelineItem
            color="success"
            icon="circle-check"
            when="10:24 AM"
            title="Order confirmed">
            We received your order and payment.
        </FluxTimelineItem>

        <FluxTimelineItem
            color="info"
            icon="box"
            when="11:02 AM"
            title="Packed">
            Your items are packed and ready to ship.
        </FluxTimelineItem>

        <FluxTimelineItem
            color="primary"
            icon="truck"
            when="1:15 PM"
            title="Out for delivery">
            The courier is on the way.
        </FluxTimelineItem>

        <FluxTimelineItem
            color="warning"
            icon="circle-exclamation"
            when="3:40 PM"
            title="Delivery delayed">
            Delivery is delayed due to weather conditions.
        </FluxTimelineItem>
    </FluxTimeline>
</template>

<script
    setup
    lang="ts">
    import { FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
