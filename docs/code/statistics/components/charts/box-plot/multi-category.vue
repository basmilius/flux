<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Build duration by branch"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :labels="['main', 'develop', 'feat/a', 'feat/b', 'feat/c', 'release']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'Minutes',
        data: [
            { min: 6, q1: 9, median: 11, q3: 14, max: 20 },
            { min: 7, q1: 10, median: 13, q3: 16, max: 24 },
            { min: 5, q1: 8, median: 10, q3: 12, max: 18 },
            { min: 8, q1: 12, median: 15, q3: 18, max: 28 },
            { min: 9, q1: 13, median: 17, q3: 20, max: 30 },
            { min: 10, q1: 14, median: 18, q3: 22, max: 32 }
        ]
    }];
</script>
