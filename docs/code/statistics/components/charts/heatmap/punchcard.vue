<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Commit punchcard"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            :advanced-options="advancedOptions"
            :series="series"
            :x-labels="hours"
            :y-labels="days"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { amber500, orange500, red500 } from '@flux-ui/internals';
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const data: FluxStatisticsChartHeatmapPoint[] = days.flatMap(day =>
        hours.map(hour => {
            const h = parseInt(hour, 10);
            const isWeekday = !['Sat', 'Sun'].includes(day);
            const peak = isWeekday && h >= 9 && h <= 17 ? Math.round(Math.random() * 24) : Math.round(Math.random() * 6);
            return { x: hour, y: day, value: peak };
        })
    );

    const series: FluxStatisticsChartHeatmapSeries[] = [{ data }];

    const advancedOptions: EChartsOption = {
        visualMap: {
            show: false,
            min: 0,
            max: 24,
            inRange: { color: [amber500, orange500, red500] }
        }
    };
</script>
