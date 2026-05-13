<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Page load spread"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart
            :labels="['/', '/dashboard', '/search', '/checkout', '/profile']"
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
        color: 'warning',
        data: [
            { min: 120, q1: 220, median: 380, q3: 560, max: 980 },
            { min: 180, q1: 320, median: 540, q3: 880, max: 1640 },
            { min: 90, q1: 160, median: 270, q3: 420, max: 720 },
            { min: 240, q1: 480, median: 820, q3: 1320, max: 2280 },
            { min: 110, q1: 190, median: 310, q3: 480, max: 820 }
        ]
    }];
</script>
