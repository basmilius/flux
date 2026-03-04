<template>
    <Preview>
        <div
            style="width: 360px; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius); background: var(--gray-100); color: var(--foreground-secondary); font-size: 14px; user-select: none;"
            @contextmenu.prevent>
            <FluxContextMenu style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <template #default>
                    Right-click anywhere in this area
                </template>

                <template #menu="{ close }">
                    <FluxMenu style="padding: 6px 0; min-width: 210px">
                        <FluxMenuGroup>
                            <FluxMenuItem
                                icon-leading="copy"
                                label="Copy"
                                @click="close()"/>

                            <FluxMenuItem
                                icon-leading="scissors"
                                label="Cut"
                                @click="close()"/>

                            <FluxMenuItem
                                icon-leading="paste"
                                label="Paste"
                                @click="close()"/>
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
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '@flux-ui/components';
</script>
