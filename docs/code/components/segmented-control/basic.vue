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
        {label: 'Grid'},
        {label: 'List'},
        {label: 'Stack'}
    ]);
</script>
