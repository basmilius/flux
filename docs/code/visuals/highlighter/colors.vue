<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="font-size: 18px;">
        <span>A <FluxVisualHighlighter color="var(--warning-200)">warning</FluxVisualHighlighter> tone.</span>
        <span>A <FluxVisualHighlighter color="var(--success-200)">success</FluxVisualHighlighter> tone.</span>
        <span>An <FluxVisualHighlighter color="var(--info-200)">info</FluxVisualHighlighter> tone.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
</script>
