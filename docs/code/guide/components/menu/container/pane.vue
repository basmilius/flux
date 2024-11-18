<template>
    <FluxPane>
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="grid-2"
                    label="Overview"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="rocket"
                    label="Releases"/>

                <FluxMenuItem
                    icon-before="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="gear"
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
