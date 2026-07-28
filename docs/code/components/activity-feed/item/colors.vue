<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            date-time="2026-03-13T08:00:00+01:00"
            icon="pen"
            when="08:00">
            The description was updated.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="primary"
            date-time="2026-03-13T08:30:00+01:00"
            icon="code-branch"
            when="08:30">
            A new branch was created.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="info"
            date-time="2026-03-13T09:15:00+01:00"
            icon="robot"
            when="09:15">
            The nightly backup finished.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="success"
            date-time="2026-03-13T10:00:00+01:00"
            icon="circle-check"
            when="10:00">
            All checks passed.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="warning"
            date-time="2026-03-13T10:45:00+01:00"
            icon="triangle-exclamation"
            when="10:45">
            Storage is at 87% of its quota.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="danger"
            date-time="2026-03-13T11:30:00+01:00"
            icon="trash"
            when="11:30">
            The staging database was deleted.
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
