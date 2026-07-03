<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxAnimatedColors
            :colors="['#2d5cf2', '#3ea34b']"
            :incrementor=".5"
            :opacity="1"
            :seed="130496"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxAnimatedColors } from '@flux-ui/visuals';
</script>
