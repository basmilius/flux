<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Compact view"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Items',
        data: [[10, 30, 6], [20, 45, 8], [30, 25, 10], [40, 50, 7], [50, 35, 9], [60, 55, 11]]
    }];

    const options: ApexOptions = {
        plotOptions: {
            bubble: {
                minBubbleRadius: 3,
                maxBubbleRadius: 14
            }
        }
    };
</script>
