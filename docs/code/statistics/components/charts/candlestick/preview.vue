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
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Price',
        data: [
            { x: new Date(2026, 0, 1), y: [102, 108, 100, 105] },
            { x: new Date(2026, 0, 2), y: [105, 110, 103, 109] },
            { x: new Date(2026, 0, 3), y: [109, 112, 106, 107] },
            { x: new Date(2026, 0, 4), y: [107, 114, 105, 112] },
            { x: new Date(2026, 0, 5), y: [112, 116, 110, 115] },
            { x: new Date(2026, 0, 6), y: [115, 118, 112, 113] },
            { x: new Date(2026, 0, 7), y: [113, 119, 111, 118] },
            { x: new Date(2026, 0, 8), y: [118, 122, 116, 120] }
        ]
    }];
</script>
