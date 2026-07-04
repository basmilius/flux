<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <p style="font-size: 21px;">
            Draw the
            <FluxVisualHighlighter ref="highlighter">annotation</FluxVisualHighlighter>
            again on demand.
        </p>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Replay"
            @click="highlighterRef?.replay()"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualHighlighter } from '@flux-ui/visuals';
    import { useTemplateRef } from 'vue';

    const highlighterRef = useTemplateRef<InstanceType<typeof FluxVisualHighlighter>>('highlighter');
</script>
