<template>
    <FluxTimeline>
        <FluxTimelineItem
            color="success"
            photo="https://avatars.githubusercontent.com/u/978257?v=4"
            icon="check"
            when="Today at 9:12 AM"
            title="Bas approved the request">
            The overlay icon highlights the type of activity on top of the avatar.
        </FluxTimelineItem>
    </FluxTimeline>
</template>

<script
    setup
    lang="ts">
    import { FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
</script>
