<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxFlickeringGrid/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxFlickeringGrid } from '@flux-ui/visuals';
</script>
