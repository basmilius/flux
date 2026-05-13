<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Pipeline value"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart
            :labels="['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']"
            :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartMixedSeries[] = [
        { name: 'Open pipeline', type: 'area', data: [42, 58, 72, 95, 114, 138] },
        { name: 'Won', type: 'line', color: 'success', data: [18, 26, 35, 48, 62, 78] }
    ];
</script>
