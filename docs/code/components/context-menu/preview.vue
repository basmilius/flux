<template>
    <Preview>
        <FluxContextMenu>
            <FluxPane style="padding: 36px; text-align: center">
                Right-click anywhere in this area
            </FluxPane>

            <template #menu="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="copy"
                            label="Duplicate"
                            type="button"
                            @click="close"/>

                        <FluxMenuItem
                            icon-leading="trash"
                            label="Delete"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
