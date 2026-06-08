<template>
    <FluxSegmentedControl v-model="view">
        <FluxSegmentedControlItem
            value="grid"
            icon="grid-2"
            label="Grid"/>

        <FluxSegmentedControlItem
            value="list"
            icon="list"
            label="List"/>
    </FluxSegmentedControl>
</template>

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
</script>
