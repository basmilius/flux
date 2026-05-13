<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Revenue and orders"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            tooltip
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartMixedSeries[] = [
        {
            name: 'Revenue',
            type: 'bar',
            data: [4200, 5300, 4900, 6200, 5800, 7100, 6800, 7500]
        },
        {
            name: 'Orders',
            type: 'line',
            data: [120, 145, 132, 168, 158, 192, 184, 205]
        }
    ];
</script>
