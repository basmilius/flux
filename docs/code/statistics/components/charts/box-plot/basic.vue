<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Survey scores"
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
        name: 'Score',
        data: [
            [40, 55, 64, 72, 86],
            [42, 58, 66, 74, 88],
            [48, 60, 70, 78, 92],
            [52, 64, 74, 82, 95]
        ]
    }];

    const options: EChartsOption = {
        xAxis: { data: ['Q1', 'Q2', 'Q3', 'Q4'] }
    };
</script>
