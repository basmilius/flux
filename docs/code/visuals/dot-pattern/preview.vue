<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxVisualDotPattern
            :width="15"
            :height="15"
            style="fill: var(--primary-600)"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxVisualDotPattern } from '@flux-ui/visuals';
</script>
