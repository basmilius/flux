<template>
    <FluxFlyout>
        <template #opener="{ open }">
            <FluxSecondaryButton
                icon-trailing="ellipsis-h"
                label="Menu"
                @click="open()"/>
        </template>

        <FluxMenu style="width: 210px">
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
    </FluxFlyout>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@flux-ui/components';
</script>
