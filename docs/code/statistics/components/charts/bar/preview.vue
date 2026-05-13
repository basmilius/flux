<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="Orders per month"
            :aspect-ratio="2.5">
            <FluxStatisticsBarChart
                :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';
    import { FluxStatisticsBarChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBarSeries[] = [{
        name: 'Orders',
        data: [320, 410, 380, 510, 470, 620, 540, 680, 590, 730, 690, 810]
    }];
</script>
