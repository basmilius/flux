<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Single sample"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :labels="['Latency']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'ms',
        color: 'primary',
        data: [
            { min: 42, q1: 58, median: 72, q3: 88, max: 124 }
        ]
    }];
</script>
