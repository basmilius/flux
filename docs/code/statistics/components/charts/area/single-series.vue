<template>
    <FluxStatisticsChartPane
        icon="chart-area"
        title="Cumulative signups"
        :aspect-ratio="3">
        <FluxStatisticsAreaChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartAreaSeries } from '@flux-ui/types';
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartAreaSeries[] = [{
        name: 'Signups',
        data: [1200, 1850, 2640, 3320, 4180, 5240, 6480, 7920, 9150, 10580, 12120, 13860]
    }];
</script>
