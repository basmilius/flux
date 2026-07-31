<template>
    <Preview>
        <FluxPane style="width: 300px">
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
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuControl, FluxPane, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const theme = ref('system');
</script>
