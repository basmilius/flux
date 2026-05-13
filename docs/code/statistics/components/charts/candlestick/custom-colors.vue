<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Branded series"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'Price',
        positiveColor: '#3b82f6',
        negativeColor: '#f97316',
        data: [
            { label: 'W1', open: 200, close: 215, low: 195, high: 220 },
            { label: 'W2', open: 215, close: 208, low: 204, high: 222 },
            { label: 'W3', open: 208, close: 230, low: 205, high: 234 },
            { label: 'W4', open: 230, close: 225, low: 218, high: 238 },
            { label: 'W5', open: 225, close: 246, low: 222, high: 250 },
            { label: 'W6', open: 246, close: 240, low: 234, high: 252 }
        ]
    }];
</script>
