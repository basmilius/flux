<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Intraday"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickPoint, FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const data: FluxStatisticsChartCandlestickPoint[] = Array.from({ length: 8 }, (_, i) => {
        const base = 200 + i * 3;
        const open = base + Math.round(Math.random() * 4);
        const close = open + Math.round((Math.random() - 0.5) * 6);
        const high = Math.max(open, close) + Math.round(Math.random() * 3);
        const low = Math.min(open, close) - Math.round(Math.random() * 3);

        return { label: `${9 + i}:00`, open, close, low, high };
    });

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'Intraday',
        data
    }];
</script>
