<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Performance grid"
        :aspect-ratio="2.4">
        <FluxStatisticsHeatmapChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { amber500, green500, red500 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const servers = ['Server A', 'Server B', 'Server C', 'Server D'];
    const slots = Array.from({ length: 10 }, (_, i) => `T${i + 1}`);

    const data = servers.flatMap((_, serverIdx) =>
        slots.map((_, slotIdx) => [slotIdx, serverIdx, Math.round(Math.random() * 100)] as [number, number, number])
    );

    const series = [{ data }];

    const options: EChartsOption = {
        xAxis: { data: slots },
        yAxis: { data: servers },
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
