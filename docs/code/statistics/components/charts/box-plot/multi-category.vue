<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Build duration by branch"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Minutes',
        data: [
            [6, 9, 11, 14, 20],
            [7, 10, 13, 16, 24],
            [5, 8, 10, 12, 18],
            [8, 12, 15, 18, 28],
            [9, 13, 17, 20, 30],
            [10, 14, 18, 22, 32]
        ]
    }];

    const options: EChartsOption = {
        xAxis: { data: ['main', 'develop', 'feat/a', 'feat/b', 'feat/c', 'release'] }
    };
</script>
