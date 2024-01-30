<template>
    <FluxButtonStack>
        <FluxFlyout>
            <template #opener="{open}">
                <FluxSecondaryButton
                    icon-after="ellipsis-h"
                    @click="open"/>
            </template>

            <template #default="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-before="scissors"
                            label="Cut"
                            @click="close"/>
                        <FluxMenuItem
                            icon-before="clone"
                            label="Copy"
                            @click="close"/>
                        <FluxMenuItem
                            icon-before="paste"
                            label="Paste"
                            @click="close"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-before="gear"
                            label="Preferences"
                            @click="close"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxFlyout>
    </FluxButtonStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxFlyout, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSeparator } from '@fancee/flux';
</script>
