<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="FLUX / USD"
            :aspect-ratio="3">
            <FluxStatisticsCandlestickChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'Price',
        data: [
            { label: '2026-01-01', open: 102, close: 105, low: 100, high: 108 },
            { label: '2026-01-02', open: 105, close: 109, low: 103, high: 110 },
            { label: '2026-01-03', open: 109, close: 107, low: 106, high: 112 },
            { label: '2026-01-04', open: 107, close: 112, low: 105, high: 114 },
            { label: '2026-01-05', open: 112, close: 115, low: 110, high: 116 },
            { label: '2026-01-06', open: 115, close: 113, low: 112, high: 118 },
            { label: '2026-01-07', open: 113, close: 118, low: 111, high: 119 },
            { label: '2026-01-08', open: 118, close: 120, low: 116, high: 122 }
        ]
    }];
</script>
