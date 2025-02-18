<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuSubHeader label="Releases"/>

                <FluxMenuItem
                    icon-leading="rocket"
                    label="Production"/>

                <FluxMenuItem
                    icon-leading="cloud"
                    label="Cloud building"/>

                <FluxMenuItem
                    icon-leading="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuSubHeader label="Manage"/>

                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"/>

                <FluxMenuItem
                    icon-leading="trash"
                    is-destructive
                    label="Delete"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>
