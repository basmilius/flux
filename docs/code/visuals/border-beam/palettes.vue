<template>
    <FluxBorderBeam
        v-for="palette of palettes"
        :key="palette"
        :color-variant="palette"
        variant="sm">
        <FluxSecondaryButton :label="palette"/>
    </FluxBorderBeam>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxBorderBeam } from '@flux-ui/visuals';

    const palettes = ['colorful', 'mono', 'ocean', 'sunset'] as const;
</script>
