<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxContextMenu :debug-cone="showCone">
            <FluxPane style="padding: 36px; text-align: center">
                Right-click this file
            </FluxPane>

            <template #menu="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="arrow-up-right-from-square"
                            label="Open"
                            type="button"
                            @click="close"/>

                        <FluxMenuFlyout
                            icon="folder-tree"
                            label="Move to">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuFlyout
                                        icon="folder"
                                        label="Documents">
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuFlyout
                                                    icon="folder"
                                                    label="Work">
                                                    <FluxMenu>
                                                        <FluxMenuGroup>
                                                            <FluxMenuItem
                                                                icon-leading="folder"
                                                                label="2025"
                                                                type="button"
                                                                @click="close"/>

                                                            <FluxMenuItem
                                                                icon-leading="folder"
                                                                label="2026"
                                                                type="button"
                                                                @click="close"/>
                                                        </FluxMenuGroup>
                                                    </FluxMenu>
                                                </FluxMenuFlyout>

                                                <FluxMenuItem
                                                    icon-leading="folder"
                                                    label="Personal"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    icon-leading="folder"
                                                    label="Invoices"
                                                    type="button"
                                                    @click="close"/>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>

                                    <FluxMenuFlyout
                                        icon="folder"
                                        label="Pictures">
                                        <FluxMenu>
                                            <FluxMenuGroup>
                                                <FluxMenuItem
                                                    icon-leading="folder"
                                                    label="Camera Roll"
                                                    type="button"
                                                    @click="close"/>

                                                <FluxMenuItem
                                                    icon-leading="folder"
                                                    label="Screenshots"
                                                    type="button"
                                                    @click="close"/>
                                            </FluxMenuGroup>
                                        </FluxMenu>
                                    </FluxMenuFlyout>

                                    <FluxMenuItem
                                        icon-leading="folder"
                                        label="Desktop"
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
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
