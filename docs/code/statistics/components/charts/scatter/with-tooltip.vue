<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Order distribution"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart
            tooltip
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartScatterSeries[] = [
        {
            name: 'Group A',
            data: [
                { x: 12, y: 32 }, { x: 18, y: 45 }, { x: 25, y: 38 }, { x: 31, y: 52 },
                { x: 38, y: 41 }, { x: 44, y: 60 }, { x: 52, y: 49 }, { x: 60, y: 65 }
            ]
        },
        {
            name: 'Group B',
            data: [
                { x: 10, y: 22 }, { x: 16, y: 30 }, { x: 23, y: 27 }, { x: 29, y: 38 },
                { x: 36, y: 33 }, { x: 42, y: 45 }, { x: 50, y: 39 }, { x: 58, y: 52 }
            ]
        }
    ];
</script>
