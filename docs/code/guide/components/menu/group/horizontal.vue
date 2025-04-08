<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu>
            <FluxMenuGroup is-horizontal>
                <FluxMenuItem
                    icon-leading="align-left"
                    is-highlighted/>

                <FluxMenuItem icon-leading="align-center"/>

                <FluxMenuItem icon-leading="align-right"/>

                <FluxMenuItem icon-leading="align-justify"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/flux';
</script>
