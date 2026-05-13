<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Compact view"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Items',
        symbolSize: (val: number[]) => 3 + (val[2] / 12) * 11,
        data: [[10, 30, 6], [20, 45, 8], [30, 25, 10], [40, 50, 7], [50, 35, 9], [60, 55, 11]]
    }];

    const options: EChartsOption = {};
</script>
