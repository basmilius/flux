<template>
    <FluxContextMenu style="width: 240px; height: 120px; background: var(--gray-100); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--foreground-secondary); font-size: 14px;">
        <span>Right-click here</span>

        <template #menu>
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxContextMenuItem
                        icon-leading="share-nodes"
                        label="Share">
                        <template #sub-menu>
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="envelope"
                                        label="Via email"/>

                                    <FluxMenuItem
                                        icon-leading="link"
                                        label="Copy link"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </template>
                    </FluxContextMenuItem>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxContextMenuItem, FluxMenu, FluxMenuGroup, FluxMenuItem } from '@flux-ui/components';
</script>
