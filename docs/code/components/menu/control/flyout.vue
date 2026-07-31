<template>
    <FluxPane style="width: 270px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="file-lines"
                    label="Document"/>

                <FluxMenuFlyout
                    icon="sliders-simple"
                    label="Appearance">
                    <FluxMenu>
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

                        <FluxMenuControl
                            is-fill
                            label="Zoom">
                            <FluxFormSlider
                                v-model="zoom"
                                aria-label="Zoom"
                                :max="200"
                                :min="50"
                                :step="10"/>
                        </FluxMenuControl>
                    </FluxMenu>
                </FluxMenuFlyout>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSlider, FluxMenu, FluxMenuControl, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const theme = ref('system');
    const zoom = ref(100);
</script>
