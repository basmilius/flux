<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxDotPattern
            :width="15"
            :height="15"
            style="fill: var(--primary-600)"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxDotPattern } from '@flux-ui/visuals';
</script>
