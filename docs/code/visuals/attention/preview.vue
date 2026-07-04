<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="horizontal"
            :gap="12">
            <FluxVisualAttention ref="attention">
                <FluxBadge
                    color="primary"
                    label="3 new"/>
            </FluxVisualAttention>

            <FluxSecondaryButton
                icon-leading="bell"
                label="Notify"
                @click="attentionRef?.play()"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualAttention } from '@flux-ui/visuals';
    import { useTemplateRef } from 'vue';

    const attentionRef = useTemplateRef<InstanceType<typeof FluxVisualAttention>>('attention');
</script>
