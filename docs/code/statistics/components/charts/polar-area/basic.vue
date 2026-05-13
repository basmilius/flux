<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Inventory"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Books', value: 30 },
        { label: 'Music', value: 24 },
        { label: 'Movies', value: 18 },
        { label: 'Games', value: 14 },
        { label: 'Other', value: 9 }
    ];
</script>
