<template>
    <FluxAspectRatio :aspect-ratio="16 / 9">
        <FluxVisualDotPattern
            :width="15"
            :height="15"
            style="fill: var(--gray-900)"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio } from '@flux-ui/components';
    import { FluxVisualDotPattern } from '@flux-ui/visuals';
</script>
