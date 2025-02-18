<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                icon-leading="arrow-up-from-square"
                icon-trailing="angle-right"
                label="My uploads"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
