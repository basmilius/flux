<template>
    <Preview>
        <FluxSegmentedControl
            v-model="view"
            style="width: 390px">
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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
</script>
