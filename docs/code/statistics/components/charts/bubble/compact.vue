<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Compact view"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBubbleSeries[] = [{
        name: 'Items',
        data: [
            { x: 10, y: 30, size: 6 }, { x: 20, y: 45, size: 8 }, { x: 30, y: 25, size: 10 },
            { x: 40, y: 50, size: 7 }, { x: 50, y: 35, size: 9 }, { x: 60, y: 55, size: 11 }
        ]
    }];
</script>
