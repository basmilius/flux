<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="font-size: 18px;">
        <span>The <FluxVisualHighlighter variant="highlight">highlight</FluxVisualHighlighter> marker.</span>
        <span>An <FluxVisualHighlighter variant="underline" color="var(--primary-solid)">underline</FluxVisualHighlighter> stroke.</span>
        <span>A <FluxVisualHighlighter variant="box" color="var(--primary-solid)">box</FluxVisualHighlighter> outline.</span>
        <span>A <FluxVisualHighlighter variant="circle" color="var(--danger-solid)">circle</FluxVisualHighlighter> around it.</span>
        <span>A <FluxVisualHighlighter variant="bracket" color="var(--primary-solid)">bracket</FluxVisualHighlighter> aside.</span>
        <span>A <FluxVisualHighlighter variant="strike-through" color="var(--danger-solid)">strike-through</FluxVisualHighlighter> line.</span>
        <span>A <FluxVisualHighlighter variant="crossed-off" color="var(--danger-solid)">crossed-off</FluxVisualHighlighter> word.</span>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
</script>
