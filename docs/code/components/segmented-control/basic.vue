<template>
    <FluxSegmentedControl v-model="view">
        <FluxSegmentedControlItem
            value="grid"
            label="Grid"/>

        <FluxSegmentedControlItem
            value="list"
            label="List"/>

        <FluxSegmentedControlItem
            value="stack"
            label="Stack"/>
    </FluxSegmentedControl>
</template>

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
</script>
