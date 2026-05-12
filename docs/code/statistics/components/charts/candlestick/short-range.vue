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
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Intraday',
        data: Array.from({ length: 8 }, (_, i) => {
            const base = 200 + i * 3;
            const open = base + Math.round(Math.random() * 4);
            const close = open + Math.round((Math.random() - 0.5) * 6);
            const high = Math.max(open, close) + Math.round(Math.random() * 3);
            const low = Math.min(open, close) - Math.round(Math.random() * 3);

            return { x: new Date(2026, 4, 12, 9 + i, 0), y: [open, high, low, close] };
        })
    }];
</script>
