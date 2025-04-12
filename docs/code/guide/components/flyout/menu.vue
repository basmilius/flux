<template>
    <FluxFlyout>
        <template #opener="{ open }">
            <FluxSecondaryButton
                icon-trailing="ellipsis-h"
                label="Menu"
                @click="open()"/>
        </template>

        <template #default="{ close }">
            <FluxMenu style="width: 270px">
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="grid-2"
                        label="Overview"
                        @click="close()"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="rocket"
                        label="Releases"
                        @click="close()"/>

                    <FluxMenuItem
                        icon-leading="rectangle-history"
                        label="History"
                        @click="close()"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="gear"
                        label="Settings"
                        @click="close()"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
</script>
