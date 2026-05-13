<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Sales overview"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            :options="options"
            :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series = [
        { name: 'Revenue', type: 'bar', data: [3800, 4200, 4700, 5100, 5500, 6200, 6800] },
        { name: 'Orders', type: 'line', data: [110, 132, 142, 156, 164, 188, 205] }
    ];

    const options: EChartsOption = {
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    };
</script>
