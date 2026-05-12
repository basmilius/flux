<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Inventory turnover"
        :aspect-ratio="3">
        <FluxStatisticsMixedChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsMixedChart } from '@flux-ui/statistics';

    const series = [
        { name: 'Stock in', type: 'column', data: [420, 450, 380, 510, 460, 530] },
        { name: 'Stock out', type: 'line', data: [310, 380, 350, 420, 390, 470] },
        { name: 'Forecast', type: 'area', data: [340, 360, 360, 430, 410, 480] }
    ];
</script>
