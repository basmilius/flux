<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Companies"
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
        name: 'Market cap',
        data: [
            { x: 12, y: 8, size: 24 },
            { x: 22, y: 14, size: 18 },
            { x: 32, y: 26, size: 12 },
            { x: 42, y: 18, size: 30 },
            { x: 52, y: 32, size: 22 },
            { x: 62, y: 24, size: 16 },
            { x: 72, y: 40, size: 28 }
        ]
    }];
</script>
