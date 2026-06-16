<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuGroup>
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
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuCollapsible, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
