<template>
    <Preview>
        <p style="max-width: 429px; font-size: 21px; line-height: 1.9; text-align: center;">
            <FluxVisualHighlighterGroup>
                Ship
                <FluxVisualHighlighter>faster</FluxVisualHighlighter>,
                stay
                <FluxVisualHighlighter
                    variant="underline"
                    color="var(--primary-solid)">consistent</FluxVisualHighlighter>,
                and delight your
                <FluxVisualHighlighter
                    variant="circle"
                    color="var(--danger-solid)">users</FluxVisualHighlighter>.
            </FluxVisualHighlighterGroup>
        </p>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualHighlighter, FluxVisualHighlighterGroup } from '@flux-ui/visuals';
</script>
