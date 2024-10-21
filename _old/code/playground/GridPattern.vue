<template>
    <FluxPane style="aspect-ratio: 16 / 9; contain: paint;">
        <FluxGridPattern
            stroke-dasharray="3"
            :squares="[[3, 3], [5, 4]]"
            style="mask-image: radial-gradient(420px circle at center, black, transparent)"/>
    </FluxPane>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxGridPattern, FluxPane } from '@basmilius/flux';
</script>
