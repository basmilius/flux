<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Weekly activity"
        :aspect-ratio="2.4">
        <FluxStatisticsHeatmapChart
            tooltip
            :series="series"
            :x-labels="weeks"
            :y-labels="days"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

    const data: FluxStatisticsChartHeatmapPoint[] = days.flatMap(day =>
        weeks.map(week => ({ x: week, y: day, value: Math.round(Math.random() * 100) }))
    );

    const series: FluxStatisticsChartHeatmapSeries[] = [{ data }];
</script>
