<template>
    <FluxTimeline>
        <FluxTimelineItem
            photo="https://avatars.githubusercontent.com/u/978257?v=4"
            when="Yesterday at 4:30 PM"
            title="Bas commented">
            Looks great, let's ship it!
        </FluxTimelineItem>

        <FluxTimelineItem
            photo="https://avatars.githubusercontent.com/u/978257?v=4"
            when="Today at 9:12 AM"
            title="Bas merged the pull request">
            Merged into <code>main</code>.
        </FluxTimelineItem>
    </FluxTimeline>
</template>

<script
    setup
    lang="ts">
    import { FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
