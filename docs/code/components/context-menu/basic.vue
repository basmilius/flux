<template>
    <FluxContextMenu>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click here
        </FluxPane>

        <template #menu="{close}">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        label="Cut"
                        type="button"
                        @click="close"/>

                    <FluxMenuItem
                        label="Copy"
                        type="button"
                        @click="close"/>

                    <FluxMenuItem
                        label="Paste"
                        type="button"
                        @click="close"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
