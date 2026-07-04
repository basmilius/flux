<template>
    <p style="max-width: 429px; font-size: 21px; line-height: 1.9; text-align: center;">
        <FluxVisualHighlighterGroup when-in-view>
            This
            <FluxVisualHighlighter>cascade</FluxVisualHighlighter>
            starts
            <FluxVisualHighlighter
                variant="underline"
                color="var(--primary-400)">only</FluxVisualHighlighter>
            once it scrolls into view.
        </FluxVisualHighlighterGroup>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualHighlighter, FluxVisualHighlighterGroup } from '@flux-ui/visuals';
</script>
