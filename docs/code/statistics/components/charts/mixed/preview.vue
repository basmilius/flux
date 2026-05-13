<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Revenue and orders"
            :aspect-ratio="3">
            <FluxStatisticsMixedChart
                :options="options"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series = [
        {
            name: 'Revenue',
            type: 'bar',
            data: [4200, 5300, 4900, 6200, 5800, 7100, 6800, 7500]
        },
        {
            name: 'Orders',
            type: 'line',
            data: [120, 145, 132, 168, 158, 192, 184, 205]
        }
    ];

    const options: EChartsOption = {
        xAxis: { data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] }
    };
</script>
