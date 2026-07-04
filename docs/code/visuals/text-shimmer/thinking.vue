<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxVisualTextShimmer
            v-if="thinking"
            style="font-size: 18px; font-weight: 600;">
            Analyzing your dashboard...
        </FluxVisualTextShimmer>

        <span
            v-else
            style="color: var(--success-600); font-size: 18px; font-weight: 600;">Analysis complete</span>

        <FluxSecondaryButton
            :label="thinking ? 'Finish' : 'Restart'"
            @click="thinking = !thinking"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualTextShimmer } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const thinking = ref(true);
</script>
