<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                icon-leading="heart"
                label="My liked videos"/>

            <FluxMenuItem
                icon-leading="arrow-up-from-square"
                label="My uploads"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@flux-ui/flux';
</script>
