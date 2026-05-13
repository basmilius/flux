<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Monthly close"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickPoint, FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data: FluxStatisticsChartCandlestickPoint[] = months.map((label, i) => {
        const open = 100 + i * 6 + Math.round(Math.random() * 8);
        const close = open + Math.round((Math.random() - 0.5) * 14);
        const high = Math.max(open, close) + Math.round(Math.random() * 6);
        const low = Math.min(open, close) - Math.round(Math.random() * 6);

        return { label, open, close, low, high };
    });

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'OHLC',
        data
    }];
</script>
