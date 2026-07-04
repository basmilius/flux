<template>
    <FluxFlex
        align="center"
        direction="vertical"
        :gap="18">
        <FluxVisualAttention
            ref="attention"
            :effect="effect">
            <FluxBadge
                color="primary"
                :label="effect"/>
        </FluxVisualAttention>

        <FluxFlex
            direction="horizontal"
            :gap="9">
            <FluxSecondaryButton
                v-for="option in effects"
                :key="option"
                :label="option"
                @click="play(option)"/>
        </FluxFlex>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualAttention } from '@flux-ui/visuals';
    import { ref, useTemplateRef } from 'vue';

    type AttentionEffect = 'pulse' | 'shake' | 'bounce' | 'tada';

    const effects: AttentionEffect[] = ['pulse', 'shake', 'bounce', 'tada'];

    const effect = ref<AttentionEffect>('pulse');
    const attentionRef = useTemplateRef<InstanceType<typeof FluxVisualAttention>>('attention');

    function play(next: AttentionEffect): void {
        effect.value = next;
        attentionRef.value?.play();
    }
</script>
