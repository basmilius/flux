<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="grid-2"
                    label="Dashboard"/>

                <FluxMenuCollapsible
                    icon-leading="cubes"
                    is-opened
                    label="Projects">
                    <FluxMenuItem label="Active"/>

                    <FluxMenuItem label="Archived"/>

                    <FluxMenuItem label="Drafts"/>
                </FluxMenuCollapsible>

                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"/>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCollapsible, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
