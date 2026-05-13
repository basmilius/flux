<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Page views"
        :aspect-ratio="3">
        <FluxStatisticsLineChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLineChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartLineSeries[] = [{
        name: 'Page views',
        data: [8400, 9200, 7800, 10500, 9100, 11300, 10200, 12600, 11400, 13800, 12900, 15200]
    }];
</script>
