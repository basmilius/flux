<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Customer segments"
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
        { name: 'New', data: [{ x: 10, y: 14 }, { x: 20, y: 22 }, { x: 30, y: 18 }, { x: 40, y: 26 }, { x: 50, y: 33 }] },
        { name: 'Returning', data: [{ x: 12, y: 30 }, { x: 25, y: 38 }, { x: 38, y: 41 }, { x: 48, y: 47 }, { x: 60, y: 55 }] },
        { name: 'VIP', data: [{ x: 18, y: 65 }, { x: 32, y: 72 }, { x: 44, y: 80 }, { x: 56, y: 85 }, { x: 70, y: 92 }] }
    ];
</script>
