<template>
    <FluxContextMenu debug-cone>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click, then move towards the submenu to see the cone
        </FluxPane>

        <template #menu="{close}">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="pen"
                        label="Rename"
                        type="button"
                        @click="close"/>

                    <FluxMenuFlyout
                        icon="arrow-up-from-square"
                        label="Share">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="paper-plane"
                                    label="Email"
                                    type="button"
                                    @click="close"/>

                                <FluxMenuItem
                                    icon-leading="copy"
                                    label="Copy link"
                                    type="button"
                                    @click="close"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="trash"
                        is-destructive
                        label="Delete"
                        type="button"
                        @click="close"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@flux-ui/components';
</script>
