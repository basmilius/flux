<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Bull run"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickPoint, FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    let base = 100;
    const data: FluxStatisticsChartCandlestickPoint[] = Array.from({ length: 12 }, (_, i) => {
        const open = base + Math.round(Math.random() * 4);
        const close = open + 4 + Math.round(Math.random() * 8);
        const high = close + Math.round(Math.random() * 6);
        const low = open - Math.round(Math.random() * 3);
        base = close;

        return { label: `D${i + 1}`, open, close, low, high };
    });

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'Trend',
        data
    }];
</script>
