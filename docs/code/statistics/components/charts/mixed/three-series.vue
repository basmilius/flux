<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Inventory turnover"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            :labels="['Q1-A', 'Q1-B', 'Q2-A', 'Q2-B', 'Q3-A', 'Q3-B']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartMixedSeries[] = [
        { name: 'Stock in', type: 'bar', data: [420, 450, 380, 510, 460, 530] },
        { name: 'Stock out', type: 'line', data: [310, 380, 350, 420, 390, 470] },
        { name: 'Forecast', type: 'area', data: [340, 360, 360, 430, 410, 480] }
    ];
</script>
