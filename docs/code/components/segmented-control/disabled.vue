<template>
    <FluxDisabled disabled>
        <FluxSegmentedControl v-model="view">
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
    </FluxDisabled>
</template>

<script
    lang="ts"
    setup>
    import { FluxDisabled, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('grid');
</script>
