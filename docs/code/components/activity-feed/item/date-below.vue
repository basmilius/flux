<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-06-24T14:24:00+02:00"
            when="24 June 2026 at 14:24">
            left a comment.

            <template #details>
                There are no options available for 10 July yet.
            </template>
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-06-24T14:23:00+02:00"
            is-date-below
            when="24 June 2026 at 14:23">
            left a comment.

            <template #details>
                I will check again tomorrow.
            </template>
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
