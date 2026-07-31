<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="user"
                    label="Account"/>

                <FluxMenuItem
                    icon-leading="gear"
                    label="Settings"/>
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
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuControl, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSegmentedControl, FluxSegmentedControlItem, FluxSeparator } from '@flux-ui/components';
    import { ref } from 'vue';

    const theme = ref('system');
</script>
