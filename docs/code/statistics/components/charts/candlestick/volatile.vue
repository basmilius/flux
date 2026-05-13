<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Volatile series"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickPoint, FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const data: FluxStatisticsChartCandlestickPoint[] = Array.from({ length: 16 }, (_, i) => {
        const open = 80 + Math.round(Math.random() * 30);
        const close = open + Math.round((Math.random() - 0.5) * 36);
        const high = Math.max(open, close) + Math.round(Math.random() * 12);
        const low = Math.min(open, close) - Math.round(Math.random() * 12);

        return { label: `Day ${i + 1}`, open, close, low, high };
    });

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'Volatile',
        data
    }];
</script>
