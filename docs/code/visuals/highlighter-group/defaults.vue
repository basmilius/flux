<template>
    <p style="max-width: 429px; font-size: 21px; line-height: 1.9; text-align: center;">
        <FluxVisualHighlighterGroup
            color="var(--primary-400)"
            variant="underline">
            Set the
            <FluxVisualHighlighter>variant</FluxVisualHighlighter>
            and
            <FluxVisualHighlighter>color</FluxVisualHighlighter>
            once on the group, and
            <FluxVisualHighlighter
                variant="highlight"
                color="var(--warning-200)">override</FluxVisualHighlighter>
            them per highlighter where needed.
        </FluxVisualHighlighterGroup>
    </p>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualHighlighter, FluxVisualHighlighterGroup } from '@flux-ui/visuals';
</script>
