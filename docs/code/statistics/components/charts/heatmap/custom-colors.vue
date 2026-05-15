<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Performance grid"
        :aspect-ratio="2.4">
        <FluxStatisticsHeatmapChart
            x-axis-labels
            y-axis-labels
            :advanced-options="advancedOptions"
            :series="series"
            :x-labels="slots"
            :y-labels="servers"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { amber500, green500, red500 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const servers = ['Server A', 'Server B', 'Server C', 'Server D'];
    const slots = Array.from({ length: 10 }, (_, i) => `T${i + 1}`);

    const data: FluxStatisticsChartHeatmapPoint[] = servers.flatMap(server =>
        slots.map(slot => ({ x: slot, y: server, value: Math.round(Math.random() * 100) }))
    );

    const series: FluxStatisticsChartHeatmapSeries[] = [{ data }];

    const advancedOptions: EChartsOption = {
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            pieces: [
                { min: 0, max: 33, color: red500 },
                { min: 34, max: 66, color: amber500 },
                { min: 67, max: 100, color: green500 }
            ]
        }
    };
</script>
