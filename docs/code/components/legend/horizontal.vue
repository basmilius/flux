<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxLegend
                :items="items"/>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxLegend, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const items = ref([
        { label: 'Components', color: '#12B87A' },
        { label: 'Dashboard', color: '#3F6AF4' },
        { label: 'Internals', color: '#E85A9A' },
        { label: 'Types', color: '#F4C23D' },
    ]);
</script>
