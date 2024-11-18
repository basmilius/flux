<template>
    <FluxPane>
        <FluxMenu>
            <FluxMenuGroup is-horizontal>
                <FluxMenuItem
                    icon-before="align-left"
                    is-highlighted/>
                <FluxMenuItem icon-before="align-center"/>
                <FluxMenuItem icon-before="align-right"/>
                <FluxMenuItem icon-before="align-justify"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
