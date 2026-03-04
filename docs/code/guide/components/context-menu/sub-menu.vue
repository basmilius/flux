<template>
    <div
        style="width: 360px; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius); background: var(--gray-100); color: var(--foreground-secondary); font-size: 14px; user-select: none;">
        <FluxContextMenu style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <template #default>
                Right-click anywhere in this area
            </template>

            <template #menu="{ close }">
                <FluxMenu style="padding: 6px 0; min-width: 210px">
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="file"
                            label="New file"
                            @click="close()"/>

                        <FluxMenuItem
                            icon-leading="folder"
                            label="New folder"
                            @click="close()"/>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxContextMenuSubMenu
                            icon-leading="share-nodes"
                            label="Share">
                            <FluxMenu style="padding: 6px 0;">
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="link"
                                        label="Copy link"
                                        @click="close()"/>

                                    <FluxMenuItem
                                        icon-leading="envelope"
                                        label="Send by email"
                                        @click="close()"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxContextMenuSubMenu>

                        <FluxContextMenuSubMenu
                            icon-leading="arrow-right-arrow-left"
                            label="Move to">
                            <FluxMenu style="padding: 6px 0;">
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="inbox"
                                        label="Inbox"
                                        @click="close()"/>

                                    <FluxMenuItem
                                        icon-leading="archive"
                                        label="Archive"
                                        @click="close()"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxContextMenuSubMenu>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete"
                            @click="close()"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxContextMenuSubMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '@flux-ui/components';
</script>
