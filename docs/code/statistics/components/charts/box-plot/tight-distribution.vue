<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Tight distribution"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :labels="['EU-W1', 'EU-C1', 'US-E1', 'AP-S1']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'Latency',
        data: [
            { min: 38, q1: 41, median: 43, q3: 45, max: 50 },
            { min: 40, q1: 42, median: 44, q3: 46, max: 49 },
            { min: 85, q1: 88, median: 90, q3: 93, max: 96 },
            { min: 120, q1: 124, median: 126, q3: 130, max: 134 }
        ]
    }];
</script>
