<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Market overview"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart
            tooltip
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBubbleSeries[] = [
        {
            name: 'Group A',
            data: [
                { x: 10, y: 30, size: 12 }, { x: 25, y: 45, size: 18 }, { x: 40, y: 28, size: 26 },
                { x: 55, y: 60, size: 22 }, { x: 70, y: 38, size: 30 }
            ]
        },
        {
            name: 'Group B',
            data: [
                { x: 15, y: 22, size: 15 }, { x: 30, y: 38, size: 12 }, { x: 45, y: 50, size: 24 },
                { x: 60, y: 32, size: 18 }, { x: 75, y: 55, size: 28 }
            ]
        }
    ];
</script>
