<template>
    <Preview>
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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedView } from '@flux-ui/components';
    import { FluxSegmentedControlItemObject } from '@flux-ui/types';
    import { ref } from 'vue';

    const index = ref(0);
    const items = ref<FluxSegmentedControlItemObject[]>([
        {icon: 'grid-2', label: 'Grid'},
        {icon: 'list', label: 'List'},
        {icon: 'rectangle-history', label: 'Stack'}
    ]);
</script>
