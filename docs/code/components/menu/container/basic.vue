<template>
    <FluxMenu>
        <FluxMenuGroup>
            <FluxMenuItem
                icon-leading="grid-2"
                label="Overview"/>

            <FluxMenuItem
                icon-leading="rocket"
                label="Releases"/>

            <FluxMenuItem
                icon-leading="rectangle-history"
                label="History"/>
        </FluxMenuGroup>
    </FluxMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem } from '@flux-ui/components';
</script>
