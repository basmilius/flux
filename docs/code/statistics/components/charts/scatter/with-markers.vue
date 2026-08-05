<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Sparse sample"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart
            :advanced-options="advancedOptions"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import type { EChartsOption } from 'echarts/core';

    const series: FluxStatisticsChartScatterSeries[] = [{
        name: 'Samples',
        data: [
            { x: 20, y: 30 }, { x: 40, y: 60 }, { x: 60, y: 35 }, { x: 80, y: 70 }, { x: 100, y: 50 }
        ]
    }];

    const advancedOptions: EChartsOption = {
        series: [{ type: 'scatter', symbolSize: 18 }]
    };
</script>
