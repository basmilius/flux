<template>
    <FluxStack
        direction="vertical"
        :gap="16">
        <FluxContextMenu
            :is-debug="isDebug"
            style="width: 240px; height: 120px; background: var(--gray-100); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--foreground-secondary); font-size: 14px;">
            <span>Right-click, then hover "More options"</span>

            <template #menu>
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="copy"
                            label="Copy"/>

                        <FluxContextMenuItem
                            icon-leading="ellipsis-h"
                            label="More options">
                            <template #sub-menu>
                                <FluxMenu>
                                    <FluxMenuGroup>
                                        <FluxMenuItem
                                            icon-leading="pen"
                                            label="Edit"/>

                                        <FluxMenuItem
                                            icon-leading="trash"
                                            is-destructive
                                            label="Delete"/>
                                    </FluxMenuGroup>
                                </FluxMenu>
                            </template>
                        </FluxContextMenuItem>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>

        <FluxFormField label="Debug mode">
            <FluxToggle v-model="isDebug"/>
        </FluxFormField>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxContextMenuItem, FluxFormField, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxStack, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const isDebug = ref(false);
</script>
