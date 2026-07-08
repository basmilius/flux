<template>
    <FluxSegmentedControl v-model="align">
        <FluxSegmentedControlItem
            value="left"
            icon="align-left"/>

        <FluxSegmentedControlItem
            value="center"
            icon="align-center"/>

        <FluxSegmentedControlItem
            value="right"
            icon="align-right"/>
    </FluxSegmentedControl>
</template>

<script
    setup
    lang="ts">
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const align = ref('left');
</script>
