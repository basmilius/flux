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
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Revenue',
        data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
    }];
</script>
