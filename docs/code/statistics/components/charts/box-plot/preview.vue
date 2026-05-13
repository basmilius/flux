<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="Response times"
            :aspect-ratio="3">
            <FluxStatisticsBoxPlotChart
                :options="options"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'ms',
        data: [
            [54, 66, 82, 88, 120],
            [22, 30, 38, 44, 60],
            [4, 6, 8, 12, 18],
            [110, 130, 152, 168, 210],
            [38, 52, 64, 78, 96]
        ]
    }];

    const options: EChartsOption = {
        xAxis: { data: ['API', 'DB', 'Cache', 'Worker', 'Search'] }
    };
</script>
