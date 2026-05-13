<template>
    <FluxStatisticsChartPane
        icon="cubes"
        title="Segment volume"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBubbleSeries[] = [
        { name: 'Retail', data: [{ x: 10, y: 12, size: 20 }, { x: 25, y: 30, size: 18 }, { x: 40, y: 22, size: 24 }, { x: 55, y: 40, size: 28 }] },
        { name: 'Enterprise', data: [{ x: 12, y: 35, size: 14 }, { x: 28, y: 18, size: 32 }, { x: 44, y: 50, size: 12 }, { x: 60, y: 28, size: 22 }] }
    ];
</script>
