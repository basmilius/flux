<template>
    <p style="max-width: 369px; font-size: 21px; line-height: 1.9; text-align: center;">
        This
        <FluxVisualHighlighter
            when-in-view
            color="var(--success-200)">annotation</FluxVisualHighlighter>
        is drawn only once it scrolls into view.
    </p>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
</script>
