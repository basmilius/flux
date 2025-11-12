<template>
    <Preview>
        <FluxSegmentedControl
            :items="items"
            style="width: 390px"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxSegmentedControl } from '@flux-ui/components';
    import { FluxSegmentedControlItemObject } from '@flux-ui/types';
    import { ref } from 'vue';

    const items = ref<FluxSegmentedControlItemObject[]>([
        {icon: 'grid-2', label: 'Grid'},
        {icon: 'list', label: 'List'},
        {icon: 'rectangle-history', label: 'Stack'}
    ]);
</script>
