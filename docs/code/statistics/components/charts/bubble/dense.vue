<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Dense distribution"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartBubblePoint, FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const data: FluxStatisticsChartBubblePoint[] = Array.from({ length: 20 }, () => ({
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        size: 4 + Math.round(Math.random() * 24)
    }));

    const series: FluxStatisticsChartBubbleSeries[] = [{
        name: 'Samples',
        data
    }];
</script>
