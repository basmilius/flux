<template>
    <FluxContextMenu>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click here
        </FluxPane>

        <template #menu>
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuSubHeader label="Highlight"/>

                    <FluxMenuPane>
                        <FluxColorPicker v-model="color"/>
                    </FluxMenuPane>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxColorPicker, FluxContextMenu, FluxMenu, FluxMenuGroup, FluxMenuPane, FluxMenuSubHeader, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const color = ref('#ef4444');
</script>
