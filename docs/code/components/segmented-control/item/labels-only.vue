<template>
    <FluxSegmentedControl v-model="range">
        <FluxSegmentedControlItem
            value="day"
            label="Day"/>

        <FluxSegmentedControlItem
            value="week"
            label="Week"/>

        <FluxSegmentedControlItem
            value="month"
            label="Month"/>
    </FluxSegmentedControl>
</template>

<script
    setup
    lang="ts">
    import { FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const range = ref('week');
</script>
