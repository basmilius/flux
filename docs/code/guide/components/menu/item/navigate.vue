<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                icon-after="angle-right"
                icon-before="arrow-up-from-square"
                label="My uploads"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
