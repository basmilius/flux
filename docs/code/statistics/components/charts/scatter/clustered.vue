<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Cluster overview"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartScatterSeries[] = [
        {
            name: 'Cluster A',
            color: 'primary',
            data: [
                { x: 8, y: 12 }, { x: 10, y: 14 }, { x: 12, y: 11 }, { x: 14, y: 15 }, { x: 11, y: 17 }, { x: 13, y: 13 }
            ]
        },
        {
            name: 'Cluster B',
            color: 'success',
            data: [
                { x: 32, y: 30 }, { x: 35, y: 33 }, { x: 38, y: 28 }, { x: 36, y: 35 }, { x: 40, y: 31 }, { x: 34, y: 36 }
            ]
        },
        {
            name: 'Cluster C',
            color: 'warning',
            data: [
                { x: 58, y: 56 }, { x: 60, y: 60 }, { x: 62, y: 54 }, { x: 64, y: 58 }, { x: 66, y: 62 }, { x: 59, y: 64 }
            ]
        }
    ];
</script>
