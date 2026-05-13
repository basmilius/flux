<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Channel scatter"
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
            name: 'Email',
            icon: 'paper-plane',
            color: 'primary',
            data: [{ x: 10, y: 20 }, { x: 20, y: 30 }, { x: 30, y: 25 }, { x: 40, y: 35 }, { x: 50, y: 32 }]
        },
        {
            name: 'Search',
            icon: 'magnifying-glass',
            color: 'success',
            data: [{ x: 12, y: 45 }, { x: 22, y: 50 }, { x: 32, y: 48 }, { x: 42, y: 55 }, { x: 52, y: 60 }]
        }
    ];
</script>
