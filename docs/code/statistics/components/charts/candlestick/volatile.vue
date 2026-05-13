<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Volatile series"
        :aspect-ratio="3">
        <FluxStatisticsCandlestickChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsCandlestickChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const labels = Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`);

    const data = labels.map(() => {
        const open = 80 + Math.round(Math.random() * 30);
        const close = open + Math.round((Math.random() - 0.5) * 36);
        const high = Math.max(open, close) + Math.round(Math.random() * 12);
        const low = Math.min(open, close) - Math.round(Math.random() * 12);

        return [open, close, low, high];
    });

    const series = [{
        name: 'Volatile',
        data
    }];

    const options: EChartsOption = {
        xAxis: { data: labels }
    };
</script>
