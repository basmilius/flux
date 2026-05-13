<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="FLUX / USD"
            :aspect-ratio="3">
            <FluxStatisticsCandlestickChart
                :options="options"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const raw = [
        { date: '2026-01-01', o: 102, h: 108, l: 100, c: 105 },
        { date: '2026-01-02', o: 105, h: 110, l: 103, c: 109 },
        { date: '2026-01-03', o: 109, h: 112, l: 106, c: 107 },
        { date: '2026-01-04', o: 107, h: 114, l: 105, c: 112 },
        { date: '2026-01-05', o: 112, h: 116, l: 110, c: 115 },
        { date: '2026-01-06', o: 115, h: 118, l: 112, c: 113 },
        { date: '2026-01-07', o: 113, h: 119, l: 111, c: 118 },
        { date: '2026-01-08', o: 118, h: 122, l: 116, c: 120 }
    ];

    const series = [{
        name: 'Price',
        data: raw.map(({ o, c, l, h }) => [o, c, l, h])
    }];

    const options: EChartsOption = {
        xAxis: { data: raw.map(d => d.date) }
    };
</script>
