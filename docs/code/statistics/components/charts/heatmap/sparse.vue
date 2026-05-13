<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Cohort retention"
        :aspect-ratio="2.4">
        <FluxStatisticsHeatmapChart
            :series="series"
            :x-labels="months"
            :y-labels="cohorts"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const cohorts = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];

    const data: FluxStatisticsChartHeatmapPoint[] = cohorts.flatMap((cohort, rowIdx) =>
        months.map((month, colIdx) => {
            const decay = Math.max(0, 100 - colIdx * 14 - rowIdx * 5 + Math.round(Math.random() * 8));
            return { x: month, y: cohort, value: decay };
        })
    );

    const series: FluxStatisticsChartHeatmapSeries[] = [{ data }];
</script>
