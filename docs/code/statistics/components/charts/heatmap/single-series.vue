<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Hourly traffic"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            x-axis-labels
            y-axis-labels
            :advanced-options="advancedOptions"
            :series="series"
            :x-labels="hours"
            :y-labels="['Traffic']"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { violet100, violet300, violet500, violet700 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const data: FluxStatisticsChartHeatmapPoint[] = hours.map(hour => ({
        x: hour,
        y: 'Traffic',
        value: Math.round(Math.random() * 1000)
    }));

    const series: FluxStatisticsChartHeatmapSeries[] = [{ data }];

    const advancedOptions: EChartsOption = {
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            inRange: {
                color: [violet100, violet300, violet500, violet700]
            }
        }
    };
</script>
