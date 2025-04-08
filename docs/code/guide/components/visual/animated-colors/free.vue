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
    import { FluxAnimatedColors, FluxAspectRatio } from '@flux-ui/flux';
</script>
