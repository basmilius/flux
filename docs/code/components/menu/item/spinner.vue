<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                command-icon="angle-right"
                icon-leading="heart"
                label="My liked videos"/>

            <FluxMenuItem
                command="42%"
                command-icon="angle-right"
                icon-leading="arrow-up-from-square"
                is-loading
                label="My uploads"/>

            <FluxMenuItem
                command-loading
                icon-leading="arrow-up-from-square"
                label="My uploads"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
