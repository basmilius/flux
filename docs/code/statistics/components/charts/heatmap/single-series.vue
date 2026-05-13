<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Hourly traffic"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { violet100, violet300, violet500, violet700 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const data = hours.map((_, i) => [i, 0, Math.round(Math.random() * 1000)] as [number, number, number]);

    const series = [{ data }];

    const options: EChartsOption = {
        xAxis: { data: hours },
        yAxis: { data: ['Traffic'] },
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
