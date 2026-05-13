<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Marketing mix"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            :labels="['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']"
            :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartMixedSeries[] = [
        { name: 'Spend', type: 'bar', icon: 'money-bill', color: 'primary', data: [2400, 2800, 3100, 3600, 4100, 4500, 5100, 5800] },
        { name: 'Reach', type: 'line', icon: 'users', color: 'info', data: [820, 1140, 1310, 1640, 1880, 2150, 2480, 2820] }
    ];
</script>
