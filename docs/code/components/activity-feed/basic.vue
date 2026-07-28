<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            actor="Bas Milius"
            avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
            date-time="2026-03-13T09:12:00+01:00"
            when="09:12">
            created the invoice.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-03-13T10:04:00+01:00"
            when="10:04">
            changed the due date to 31 March 2026.
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Thomas de Vries"
            avatar-fallback-initials="TV"
            date-time="2026-03-13T14:38:00+01:00"
            when="14:38">
            sent the invoice to the customer.
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
