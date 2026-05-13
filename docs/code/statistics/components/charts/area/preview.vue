<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-area"
            title="Monthly revenue"
            :aspect-ratio="3">
            <FluxStatisticsAreaChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartAreaSeries } from '@flux-ui/types';
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartAreaSeries[] = [{
        name: 'Revenue',
        color: '#10b981',
        data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
    }];
</script>
