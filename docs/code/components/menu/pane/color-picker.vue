<template>
    <FluxPane style="width: 240px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="bold"
                    label="Bold"/>

                <FluxMenuItem
                    icon-leading="italic"
                    label="Italic"/>

                <FluxMenuFlyout
                    icon="palette"
                    label="Text color">
                    <FluxMenu>
                        <FluxMenuPane>
                            <FluxColorPicker v-model="color"/>
                        </FluxMenuPane>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorPicker, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxMenuPane, FluxPane } from '@flux-ui/components';
    import { ref } from 'vue';

    const color = ref('#22c55e');
</script>
