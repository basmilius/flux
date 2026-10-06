<template>
    <FluxSegmentedControl v-model="view">
        <FluxSegmentedControlItem value="notes">
            <span>Notes</span>
            <FluxBadge label="10"/>
        </FluxSegmentedControlItem>

        <FluxSegmentedControlItem value="tasks">
            <span>Tasks</span>
            <FluxBadge label="4"/>
        </FluxSegmentedControlItem>

        <FluxSegmentedControlItem value="files">
            <span>Files</span>
            <FluxBadge label="7"/>
        </FluxSegmentedControlItem>
    </FluxSegmentedControl>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const view = ref('notes');
</script>
