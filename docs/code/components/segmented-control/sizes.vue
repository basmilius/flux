<template>
    <div style="display: flex; flex-flow: column; gap: 12px; align-items: start">
        <FluxSegmentedControl
            v-model="view"
            size="small">
            <FluxSegmentedControlItem
                value="grid"
                icon="grid-2"
                label="Grid"/>

            <FluxSegmentedControlItem
                value="list"
                icon="list"
                label="List"/>

            <FluxSegmentedControlItem
                value="stack"
                icon="rectangle-history"
                label="Stack"/>
        </FluxSegmentedControl>

        <FluxSegmentedControl
            v-model="view"
            size="medium">
            <FluxSegmentedControlItem
                value="grid"
                icon="grid-2"
                label="Grid"/>

            <FluxSegmentedControlItem
                value="list"
                icon="list"
                label="List"/>

            <FluxSegmentedControlItem
                value="stack"
                icon="rectangle-history"
                label="Stack"/>
        </FluxSegmentedControl>

        <FluxSegmentedControl
            v-model="view"
            size="large">
            <FluxSegmentedControlItem
                value="grid"
                icon="grid-2"
                label="Grid"/>

            <FluxSegmentedControlItem
                value="list"
                icon="list"
                label="List"/>

            <FluxSegmentedControlItem
                value="stack"
                icon="rectangle-history"
                label="Stack"/>
        </FluxSegmentedControl>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
</script>
