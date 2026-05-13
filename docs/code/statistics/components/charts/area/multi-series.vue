<template>
    <FluxStatisticsChartPane
        icon="chart-area"
        title="Revenue comparison"
        :aspect-ratio="2.5">
        <FluxStatisticsAreaChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series = [
        {
            name: 'This year',
            data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
        },
        {
            name: 'Last year',
            data: [3100, 4200, 3800, 5300, 4700, 6600, 5500, 7100, 6300, 8200, 7600, 9100]
        }
    ];
</script>
