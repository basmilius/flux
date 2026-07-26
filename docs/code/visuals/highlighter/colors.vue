<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="font-size: 18px;">
        <span>A <FluxVisualHighlighter color="var(--warning-soft-hover)">warning</FluxVisualHighlighter> tone.</span>
        <span>A <FluxVisualHighlighter color="var(--success-soft-hover)">success</FluxVisualHighlighter> tone.</span>
        <span>An <FluxVisualHighlighter color="var(--info-soft-hover)">info</FluxVisualHighlighter> tone.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
</script>
