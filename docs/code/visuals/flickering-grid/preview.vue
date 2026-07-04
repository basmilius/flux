<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxVisualFlickeringGrid/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxVisualFlickeringGrid } from '@flux-ui/visuals';
</script>
