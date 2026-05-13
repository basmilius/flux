<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Channel performance"
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
        {
            name: 'Email',
            icon: 'paper-plane',
            color: 'primary',
            data: [{ x: 12, y: 30, size: 18 }, { x: 28, y: 40, size: 22 }, { x: 44, y: 22, size: 16 }, { x: 60, y: 48, size: 28 }]
        },
        {
            name: 'Search',
            icon: 'magnifying-glass',
            color: 'success',
            data: [{ x: 14, y: 18, size: 14 }, { x: 30, y: 28, size: 20 }, { x: 46, y: 40, size: 24 }, { x: 62, y: 32, size: 18 }]
        }
    ];
</script>
