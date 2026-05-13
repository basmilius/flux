<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Tight distribution"
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
        name: 'Latency',
        data: [
            [38, 41, 43, 45, 50],
            [40, 42, 44, 46, 49],
            [85, 88, 90, 93, 96],
            [120, 124, 126, 130, 134]
        ]
    }];

    const options: EChartsOption = {
        xAxis: { data: ['EU-W1', 'EU-C1', 'US-E1', 'AP-S1'] }
    };
</script>
