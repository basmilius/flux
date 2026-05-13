<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Weekly checkouts"
        :aspect-ratio="2.5">
        <FluxStatisticsBarChart
            :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';
    import { FluxStatisticsBarChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBarSeries[] = [{
        name: 'Checkouts',
        color: 'success',
        data: [240, 320, 290, 380, 410, 520, 460]
    }];
</script>
