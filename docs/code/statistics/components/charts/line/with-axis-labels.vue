<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Monthly revenue"
        :aspect-ratio="3">
        <FluxStatisticsLineChart
            split-lines
            x-axis-labels
            y-axis-labels
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLineChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartLineSeries[] = [{
        name: 'Revenue',
        data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
    }];
</script>
