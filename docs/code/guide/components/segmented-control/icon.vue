<template>
    <FluxSegmentedControl
        :items="items"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl } from '@flux-ui/components';
    import { ref } from 'vue';
    import { FluxSegmentedControlItemObject } from '@flux-ui/types';

    const items = ref<FluxSegmentedControlItemObject[]>([
        {icon: 'grid-2'},
        {icon: 'list'},
        {icon: 'rectangle-history'}
    ]);
</script>
