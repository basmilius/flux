<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="grid-2"
            title="Weekly activity"
            :aspect-ratio="2.4">
            <FluxStatisticsHeatmapChart
                :options="options"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

    const data = days.flatMap((_, dayIdx) =>
        weeks.map((_, weekIdx) => [weekIdx, dayIdx, Math.round(Math.random() * 100)] as [number, number, number])
    );

    const series = [{ data }];

    const options: EChartsOption = {
        xAxis: { data: weeks },
        yAxis: { data: days }
    };
</script>
