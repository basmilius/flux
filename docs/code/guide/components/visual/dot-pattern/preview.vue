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
    import { FluxAspectRatio, FluxDotPattern } from '@flux-ui/components';
</script>
