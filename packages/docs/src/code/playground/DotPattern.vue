<template>
    <FluxPane style="aspect-ratio: 16 / 9; contain: paint;">
        <FluxDotPattern :cr="1"/>
    </FluxPane>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxDotPattern, FluxPane } from '@basmilius/flux';
</script>
