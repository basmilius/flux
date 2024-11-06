<template>
    <FluxMenu>
        <FluxMenuItem
            icon-before="grid-2"
            label="Overview"/>

        <FluxMenuItem
            icon-before="rocket"
            label="Releases"/>

        <FluxMenuItem
            icon-before="rectangle-history"
            label="History"/>
    </FluxMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem } from '@basmilius/flux';
</script>
