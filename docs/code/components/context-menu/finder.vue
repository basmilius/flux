<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxContextMenu :debug-cone="showCone">
            <FluxPane style="padding: 36px; text-align: center">
                Right-click this item
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
                            icon="image"
                            label="Open With">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="eye"
                                        label="Preview"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="image"
                                        label="Photos"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>

                                <FluxSeparator/>

                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        label="App Store…"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Move to Trash"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="circle-info"
                            label="Get Info"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="clone"
                            label="Duplicate"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="eye"
                            label="Quick Look"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="copy"
                            label="Copy"
                            type="button"
                            @click="close"/>

                        <FluxMenuFlyout
                            icon="arrow-up-from-square"
                            label="Share">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="paper-plane"
                                        label="Mail"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="copy"
                                        label="Copy Link"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuFlyout
                            icon="bolt"
                            label="Quick Actions">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="rotate-left"
                                        label="Rotate Left"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="pen"
                                        label="Markup"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="image"
                                        label="Convert Image"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuFlyout
                            icon="palette"
                            label="Tags">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="circle"
                                        label="Red"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="circle"
                                        label="Orange"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="circle"
                                        label="Green"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>

                        <FluxMenuFlyout
                            icon="gear"
                            label="Services">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        label="Show in Enclosing Folder"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        label="New Terminal at Folder"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
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
