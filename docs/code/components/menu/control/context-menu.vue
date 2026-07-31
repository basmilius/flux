<template>
    <FluxContextMenu>
        <FluxPane style="padding: 36px; text-align: center">
            Right-click here
        </FluxPane>

        <template #menu>
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="copy"
                        label="Copy"/>

                    <FluxMenuItem
                        icon-leading="paste"
                        label="Paste"/>
                </FluxMenuGroup>

                <FluxSeparator/>

                <FluxMenuControl label="Theme">
                    <FluxSegmentedControl
                        v-model="theme"
                        size="small">
                        <FluxSegmentedControlItem
                            icon="circle-half-stroke"
                            title="Follow your system"
                            value="system"/>

                        <FluxSegmentedControlItem
                            icon="sun-bright"
                            title="Light"
                            value="light"/>

                        <FluxSegmentedControlItem
                            icon="moon"
                            title="Dark"
                            value="dark"/>
                    </FluxSegmentedControl>
                </FluxMenuControl>
            </FluxMenu>
        </template>
    </FluxContextMenu>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuControl, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const theme = ref('system');
</script>
