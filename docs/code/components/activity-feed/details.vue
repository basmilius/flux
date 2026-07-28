<template>
    <FluxActivityFeed>
        <FluxActivityFeedItem
            actor="Sarah Jansen"
            avatar-fallback-initials="SJ"
            date-time="2026-03-13T10:04:00+01:00"
            when="10:04">
            left a review.

            <template #details>
                The color tokens still reference the removed palette scales, could you rebase on main first?
            </template>
        </FluxActivityFeedItem>

        <FluxActivityFeedItem
            actor="Bas Milius"
            color="primary"
            date-time="2026-03-13T11:22:00+01:00"
            icon="code-branch"
            when="11:22">
            pushed 2 commits.

            <template #details>
                <div>fix(tokens): drop the last references to the removed scales</div>
                <div>chore: rebase on main</div>
            </template>
        </FluxActivityFeedItem>
    </FluxActivityFeed>
</template>

<script
    setup
    lang="ts">
    import { FluxActivityFeed, FluxActivityFeedItem } from '@flux-ui/components';
</script>
