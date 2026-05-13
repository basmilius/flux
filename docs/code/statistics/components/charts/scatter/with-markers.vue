<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Sparse sample"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Samples',
        symbolSize: 18,
        data: [[20, 30], [40, 60], [60, 35], [80, 70], [100, 50]]
    }];

    const options: EChartsOption = {};
</script>
