<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="store"
                title="Expenses at each store"/>
            <FluxPaneBody>
                <FluxPercentageBar
                    is-legend-visible
                    :items="items"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxPercentageBar } from '@flux-ui/components';
    import type { FluxPercentageBarItemObject } from '@flux-ui/types';
    import { ref } from 'vue';

    const items = ref<FluxPercentageBarItemObject[]>([
        { label: 'Aldi', color: '#00529B', icon: "store", value: 0.25 },
        { label: 'Albert Heijn', color: '#00A1E4', icon: "store", value: 0.1 },
        { label: 'Jumbo', color: '#FFD700', icon: "store", value: 0.5 },
        { label: 'Plus', color: '#6BA539', icon: "store", value: 0.1 },
        { label: 'Other', color: '#CBD5E1', icon: "store", value: 0.05 }
    ]);
</script>
