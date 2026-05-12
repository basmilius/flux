<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Survey scores"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Score',
        data: [
            { x: 'Q1', y: [40, 55, 64, 72, 86] },
            { x: 'Q2', y: [42, 58, 66, 74, 88] },
            { x: 'Q3', y: [48, 60, 70, 78, 92] },
            { x: 'Q4', y: [52, 64, 74, 82, 95] }
        ]
    }];
</script>
