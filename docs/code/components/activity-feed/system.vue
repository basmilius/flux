<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            color="info"
            date-time="2026-03-13T02:00:00+01:00"
            icon="robot"
            when="02:00">
            The nightly backup finished.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="warning"
            date-time="2026-03-13T02:14:00+01:00"
            icon="triangle-exclamation"
            when="02:14">
            Storage is at 87% of its quota.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="success"
            date-time="2026-03-13T08:30:00+01:00"
            icon="rocket"
            when="08:30">
            Version 2.4.0 was deployed to production.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="danger"
            date-time="2026-03-13T08:41:00+01:00"
            icon="lock"
            when="08:41">
            Three failed sign-in attempts were blocked.
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
