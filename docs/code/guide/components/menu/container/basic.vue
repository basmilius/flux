<template>
    <FluxMenu>
        <FluxMenuItem
            icon-leading="grid-2"
            label="Overview"/>

        <FluxMenuItem
            icon-leading="rocket"
            label="Releases"/>

        <FluxMenuItem
            icon-leading="rectangle-history"
            label="History"/>
    </FluxMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem } from '@basmilius/flux';
</script>
