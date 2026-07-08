<template>
    <FluxSegmentedControl v-model="folder">
        <FluxSegmentedControlItem value="inbox">
            <FluxIcon name="message"/>
            <span>Inbox</span>
            <FluxBadge label="12"/>
        </FluxSegmentedControlItem>

        <FluxSegmentedControlItem value="archive">
            <FluxIcon name="box"/>
            <span>Archive</span>
        </FluxSegmentedControlItem>
    </FluxSegmentedControl>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxIcon, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const folder = ref('inbox');
</script>
