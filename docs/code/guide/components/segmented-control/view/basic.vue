<template>
    <FluxPane style="width: max-content">
        <FluxPaneBody>
            <FluxSegmentedControl
                v-model="index"
                :items="items"
                style="width: 390px"/>
        </FluxPaneBody>

        <FluxSegmentedView
            :index="index">
            <FluxPaneBody>
                Grid
            </FluxPaneBody>

            <FluxPaneBody>
                List
            </FluxPaneBody>

            <FluxPaneBody>
                Stack
            </FluxPaneBody>
        </FluxSegmentedView>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedView } from '@flux-ui/components';
    import { FluxSegmentedControlItemObject } from '@flux-ui/types';
    import { ref } from 'vue';

    const index = ref(0);
    const items = ref<FluxSegmentedControlItemObject[]>([
        {label: 'Grid'},
        {label: 'List'},
        {label: 'Stack'}
    ]);
</script>
