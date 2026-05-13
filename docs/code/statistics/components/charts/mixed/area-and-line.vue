<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="User activity"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
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
            name: 'Total users',
            type: 'area',
            data: [1200, 1450, 1620, 1880, 2100, 2350, 2600]
        },
        {
            name: 'Active users',
            type: 'line',
            data: [820, 950, 1080, 1260, 1420, 1580, 1750]
        }
    ];
</script>
