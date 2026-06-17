<template>
    <FluxContextMenu>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click here
        </FluxPane>

        <template #menu>
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        label="Cut"
                        type="button"/>

                    <FluxMenuItem
                        label="Copy"
                        type="button"/>

                    <FluxMenuItem
                        label="Paste"
                        type="button"/>
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
