<template>
    <FluxVisualBorderBeam
        v-for="palette of palettes"
        :key="palette"
        :color-variant="palette"
        variant="sm">
        <FluxSecondaryButton :label="palette"/>
    </FluxVisualBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualBorderBeam } from '@flux-ui/visuals';

    const palettes = ['colorful', 'mono', 'ocean', 'sunset'] as const;
</script>
