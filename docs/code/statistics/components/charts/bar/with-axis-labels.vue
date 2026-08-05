<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Orders per month"
        :aspect-ratio="2.5">
        <FluxStatisticsBarChart
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
    import { FluxStatisticsBarChart, FluxStatisticsChartPane } from '@flux-ui/statistics';
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';

    const series: FluxStatisticsChartBarSeries[] = [{
        name: 'Orders',
        data: [320, 410, 380, 510, 470, 620, 540, 680, 590, 730, 690, 810]
    }];
</script>
