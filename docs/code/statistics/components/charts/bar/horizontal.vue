<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Top countries"
        :aspect-ratio="2">
        <FluxStatisticsBarChart
            :advanced-options="advancedOptions"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';
    import { FluxStatisticsBarChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const countries = ['Netherlands', 'Germany', 'Belgium', 'France', 'United Kingdom', 'Spain'];

    const series: FluxStatisticsChartBarSeries[] = [{
        name: 'Orders',
        data: [4200, 3100, 1800, 1500, 1200, 800]
    }];

    const advancedOptions: EChartsOption = {
        xAxis: {
            type: 'value',
            show: true,
            axisLabel: { show: true, color: 'var(--foreground-secondary)' }
        },
        yAxis: {
            type: 'category',
            show: true,
            data: countries,
            axisLabel: { show: true, color: 'var(--foreground-secondary)' }
        }
    };
</script>
