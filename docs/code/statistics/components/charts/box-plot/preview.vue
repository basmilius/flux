<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="Response times"
            :aspect-ratio="3">
            <FluxStatisticsBoxPlotChart
                :labels="['API', 'DB', 'Cache', 'Worker', 'Search']"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'ms',
        data: [
            { min: 54, q1: 66, median: 82, q3: 88, max: 120 },
            { min: 22, q1: 30, median: 38, q3: 44, max: 60 },
            { min: 4, q1: 6, median: 8, q3: 12, max: 18 },
            { min: 110, q1: 130, median: 152, q3: 168, max: 210 },
            { min: 38, q1: 52, median: 64, q3: 78, max: 96 }
        ]
    }];
</script>
