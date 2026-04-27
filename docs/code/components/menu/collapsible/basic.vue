<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuCollapsible
                icon-leading="cubes"
                label="Projects">
                <FluxMenuItem label="Active"/>

                <FluxMenuItem label="Archived"/>
            </FluxMenuCollapsible>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCollapsible, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
