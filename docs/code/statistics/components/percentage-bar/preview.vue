<template>
    <Preview>
        <FluxStatisticsBase
            icon="store"
            title="Expenses at each store">
            <FluxStatisticsPercentageBar :items="items"/>
        </FluxStatisticsBase>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsPercentageBar } from '@flux-ui/statistics';
    import type { FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';

    const items: FluxStatisticsPercentageBarItemObject[] = [
        { label: 'Aldi', color: '#00529B', icon: 'store', value: 0.25 },
        { label: 'Albert Heijn', color: '#00A1E4', icon: 'store', value: 0.1 },
        { label: 'Jumbo', color: '#FFD700', icon: 'store', value: 0.5 },
        { label: 'Plus', color: '#6BA539', icon: 'store', value: 0.1 },
        { label: 'Other', color: '#CBD5E1', icon: 'store', value: 0.05 }
    ];
</script>
