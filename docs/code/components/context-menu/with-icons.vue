<template>
    <FluxContextMenu @open="onOpen">
        <FluxPane style="padding: 36px; text-align: center">
            Right-click for actions
        </FluxPane>

        <template #menu="{close}">
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="pen"
                    label="Edit"
                    type="button"
                    @click="close"/>

                <FluxMenuItem
                    icon-leading="copy"
                    label="Duplicate"
                    type="button"
                    @click="close"/>

                <FluxSeparator/>

                <FluxMenuItem
                    icon-leading="trash"
                    label="Delete"
                    type="button"
                    @click="close"/>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxContextMenu, FluxMenu, FluxMenuItem, FluxPane, FluxSeparator } from '@flux-ui/components';

    function onOpen(): void {
        // The menu opened at the cursor.
    }
</script>
