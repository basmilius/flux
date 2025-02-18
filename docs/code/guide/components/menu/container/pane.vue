<template>
    <FluxPane>
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="grid-2"
                    label="Overview"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="rocket"
                    label="Releases"/>

                <FluxMenuItem
                    icon-leading="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>
