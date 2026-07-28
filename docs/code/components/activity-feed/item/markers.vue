<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            actor="Bas Milius"
            avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
            date-time="2026-03-13T09:12:00+01:00"
            when="09:12">
            uploaded a photo.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-03-13T10:04:00+01:00"
            when="10:04">
            renamed the project.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="info"
            date-time="2026-03-13T11:47:00+01:00"
            icon="user-plus"
            when="11:47">
            Two seats were added to the subscription.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            date-time="2026-03-13T12:03:00+01:00"
            when="12:03">
            The export is ready for download.
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
