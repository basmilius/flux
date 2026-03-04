<template>
    <div style="display: flex; flex-flow: column; gap: 12px; align-items: flex-start;">
        <p style="margin: 0; font-size: 14px; color: var(--foreground-secondary);">
            Enable the debug mode to visualize the prediction cone when hovering over a sub-menu item.
        </p>

        <FluxToggle
            v-model="isDebug"
            label="Show prediction cone"/>

        <div
            style="width: 360px; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius); background: var(--gray-100); color: var(--foreground-secondary); font-size: 14px; user-select: none;">
            <FluxContextMenu
                :is-debug="isDebug"
                style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <template #default>
                    Right-click anywhere in this area
                </template>

                <template #menu="{ close }">
                    <FluxMenu style="padding: 6px 0; min-width: 210px">
                        <FluxMenuGroup>
                            <FluxContextMenuSubMenu
                                icon-leading="palette"
                                label="Change color">
                                <FluxMenu style="padding: 6px 0;">
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Red"
                                            @click="close()"/>

                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Green"
                                            @click="close()"/>

                                        <FluxMenuItem
                                            icon-leading="circle"
                                            label="Blue"
                                            @click="close()"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxContextMenuSubMenu>

                            <FluxContextMenuSubMenu
                                icon-leading="font"
                                label="Change font">
                                <FluxMenu style="padding: 6px 0;">
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            label="Inter"
                                            @click="close()"/>

                                        <FluxMenuItem
                                            label="Roboto"
                                            @click="close()"/>

                                        <FluxMenuItem
                                            label="Fira Sans"
                                            @click="close()"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </FluxContextMenuSubMenu>
                        </FluxMenuGroup>
                    </FluxMenu>
                </template>
            </FluxContextMenu>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxContextMenuSubMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const isDebug = ref(false);
</script>
