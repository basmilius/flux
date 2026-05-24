<template>
    <FluxStatisticsBase
        icon="store"
        title="Expenses at each store">
        <FluxStatisticsLegendScope>
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsPercentageBar :items="items"/>
                <FluxStatisticsLegend/>
            </FluxFlex>
        </FluxStatisticsLegendScope>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsLegend, FluxStatisticsLegendScope, FluxStatisticsPercentageBar } from '@flux-ui/statistics';
    import type { FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';

    const items: FluxStatisticsPercentageBarItemObject[] = [
        { label: 'Aldi', color: '#00529B', icon: 'store', value: 0.25, displayValue: '25%' },
        { label: 'Albert Heijn', color: '#00A1E4', icon: 'store', value: 0.1, displayValue: '10%' },
        { label: 'Jumbo', color: '#FFD700', icon: 'store', value: 0.5, displayValue: '50%' },
        { label: 'Plus', color: '#6BA539', icon: 'store', value: 0.1, displayValue: '10%' },
        { label: 'Other', color: '#CBD5E1', icon: 'store', value: 0.05, displayValue: '5%' }
    ];
</script>
