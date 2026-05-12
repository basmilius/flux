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
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'OHLC',
        data: Array.from({ length: 12 }, (_, i) => {
            const open = 100 + i * 6 + Math.round(Math.random() * 8);
            const close = open + Math.round((Math.random() - 0.5) * 14);
            const high = Math.max(open, close) + Math.round(Math.random() * 6);
            const low = Math.min(open, close) - Math.round(Math.random() * 6);

            return { x: new Date(2026, i, 1), y: [open, high, low, close] };
        })
    }];
</script>
