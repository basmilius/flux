<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Quarterly conversions"
        :aspect-ratio="3">
        <FluxStatisticsLineChart
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
        name: 'Conversions',
        data: [124, 168, 145, 192, 178, 218, 204, 256, 232, 284, 262, 312]
    }];
</script>
