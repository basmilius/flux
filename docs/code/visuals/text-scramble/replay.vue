<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxVisualTextScramble
            ref="scramble"
            text="ACCESS GRANTED"
            style="color: var(--success-600); font-size: 24px; font-weight: 700; letter-spacing: 0.08em;"/>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Replay"
            @click="replay"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualTextScramble } from '@flux-ui/visuals';
    import { useTemplateRef } from 'vue';

    const scrambleRef = useTemplateRef<InstanceType<typeof FluxVisualTextScramble>>('scramble');

    function replay(): void {
        scrambleRef.value?.replay();
    }
</script>
