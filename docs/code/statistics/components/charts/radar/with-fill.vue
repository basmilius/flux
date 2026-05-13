<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Feature coverage"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :advanced-options="advancedOptions"
            :indicators="indicators"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartRadarSeries[] = [
        { name: 'Coverage', values: [75, 90, 60, 80, 70, 85] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Auth', max: 100 },
        { name: 'API', max: 100 },
        { name: 'UI', max: 100 },
        { name: 'Storage', max: 100 },
        { name: 'Sync', max: 100 },
        { name: 'Search', max: 100 }
    ];

    const advancedOptions: EChartsOption = {
        series: [{
            type: 'radar',
            areaStyle: { opacity: 0.55 },
            lineStyle: { width: 3 }
        }]
    };
</script>
