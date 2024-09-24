<template>
    <FluxPane style="aspect-ratio: 16 / 9; contain: paint;">
        <FluxFlickeringGrid
            color="#cbd5e1"
            :gap="2"
            :max-opacity=".5"
            :size="6"/>
    </FluxPane>
</template>

<script lang="ts">
    export const enabled = false;
</script>

<script
    lang="ts"
    setup>
    import { FluxFlickeringGrid, FluxPane } from '@basmilius/flux';
</script>
