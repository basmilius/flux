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
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Volatile',
        data: Array.from({ length: 16 }, (_, i) => {
            const open = 80 + Math.round(Math.random() * 30);
            const close = open + Math.round((Math.random() - 0.5) * 36);
            const high = Math.max(open, close) + Math.round(Math.random() * 12);
            const low = Math.min(open, close) - Math.round(Math.random() * 12);

            return { x: new Date(2026, 0, i + 1), y: [open, high, low, close] };
        })
    }];
</script>
