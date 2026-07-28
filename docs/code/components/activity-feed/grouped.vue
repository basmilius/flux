<template>
    <FluxActivityFeed is-grouped>
        <FluxActivityFeedItem
            actor="Bas Milius"
            avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
            date-time="2026-03-13T16:20:00+01:00"
            day="Today"
            when="16:20">
            archived the project.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-03-13T09:05:00+01:00"
            day="Today"
            when="09:05">
            marked the last task as done.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            color="success"
            date-time="2026-03-12T18:44:00+01:00"
            day="Yesterday"
            icon="rocket"
            when="18:44">
            Version 2.4.0 was deployed to production.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Thomas de Vries"
            avatar-fallback-initials="TV"
            date-time="2026-03-09T13:12:00+01:00"
            day="9 March 2026"
            when="13:12">
            invited two teammates.
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
