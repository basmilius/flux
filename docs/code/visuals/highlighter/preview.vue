<template>
    <Preview>
        <p style="max-width: 369px; font-size: 21px; line-height: 1.9; text-align: center;">
            Flux makes it easy to build
            <FluxVisualHighlighter>beautiful</FluxVisualHighlighter>
            and
            <FluxVisualHighlighter
                variant="underline"
                color="var(--primary-400)">accessible</FluxVisualHighlighter>
            interfaces.
        </p>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
</script>
