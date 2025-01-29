<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-before="grid-2"
                        label="Overview"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Releases"/>

                    <FluxMenuItem
                        icon-before="rocket"
                        label="Production"/>

                    <FluxMenuItem
                        icon-before="cloud"
                        label="Cloud building"/>

                    <FluxMenuItem
                        icon-before="rectangle-history"
                        label="History"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Manage"/>

                    <FluxMenuItem
                        icon-before="gear"
                        label="Settings"/>

                    <FluxMenuItem
                        icon-before="trash"
                        is-destructive
                        label="Delete"/>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>
