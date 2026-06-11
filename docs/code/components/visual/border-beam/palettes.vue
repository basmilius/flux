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
    import { FluxBorderBeam, FluxSecondaryButton } from '@flux-ui/components';

    const palettes = ['colorful', 'mono', 'ocean', 'sunset'] as const;
</script>
