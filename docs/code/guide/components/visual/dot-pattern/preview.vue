<template>
    <FluxAspectRatio :aspect-ratio="21 / 9">
        <FluxDotPattern
            :width="15"
            :height="15"
            style="fill: rgb(var(--primary-7))"/>
    </FluxAspectRatio>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxDotPattern } from '@basmilius/flux';
</script>
