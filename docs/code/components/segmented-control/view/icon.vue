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
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedView } from '@flux-ui/components';
    import { ref } from 'vue';
    import { FluxSegmentedControlItemObject } from '@flux-ui/types';

    const index = ref(0);
    const items = ref<FluxSegmentedControlItemObject[]>([
        {icon: 'grid-2'},
        {icon: 'list'},
        {icon: 'rectangle-history'}
    ]);
</script>
