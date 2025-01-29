<template>
    <Preview>
        <FluxAnimatedColors
            :colors="['#6071b5', '#f07db7', '#0284c7']"
            :incrementor=".5"
            :opacity="1"
            :seed="130496"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAnimatedColors } from '@basmilius/flux';
</script>
