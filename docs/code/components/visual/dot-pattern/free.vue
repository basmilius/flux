<template>
    <FluxAspectRatio :aspect-ratio="16 / 9">
        <FluxDotPattern
            :width="15"
            :height="15"
            style="fill: var(--gray-900)"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxDotPattern } from '@flux-ui/components';
</script>
