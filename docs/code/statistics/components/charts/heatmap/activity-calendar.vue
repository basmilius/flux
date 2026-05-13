<template>
    <FluxStatisticsChartPane
        icon="calendar"
        title="Contribution graph"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { emerald100, emerald300, emerald500, emerald700 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const days = ['Mon', 'Wed', 'Fri', 'Sun'];
    const weeks = Array.from({ length: 24 }, (_, i) => `W${i + 1}`);

    const data = days.flatMap((_, dayIdx) =>
        weeks.map((_, weekIdx) => [weekIdx, dayIdx, Math.round(Math.random() * 12)] as [number, number, number])
    );

    const series = [{ data }];

    const options: EChartsOption = {
        xAxis: { data: weeks },
        yAxis: { data: days },
        visualMap: {
            show: false,
            min: 0,
            max: 12,
            pieces: [
                { min: 0, max: 2, color: emerald100 },
                { min: 3, max: 5, color: emerald300 },
                { min: 6, max: 8, color: emerald500 },
                { min: 9, max: 12, color: emerald700 }
            ]
        }
    };
</script>
