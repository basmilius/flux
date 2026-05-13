<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Survey scores"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :labels="['Q1', 'Q2', 'Q3', 'Q4']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'Score',
        data: [
            { min: 40, q1: 55, median: 64, q3: 72, max: 86 },
            { min: 42, q1: 58, median: 66, q3: 74, max: 88 },
            { min: 48, q1: 60, median: 70, q3: 78, max: 92 },
            { min: 52, q1: 64, median: 74, q3: 82, max: 95 }
        ]
    }];
</script>
