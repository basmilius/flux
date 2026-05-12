<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Build duration by branch"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Minutes',
        data: [
            { x: 'main', y: [6, 9, 11, 14, 20] },
            { x: 'develop', y: [7, 10, 13, 16, 24] },
            { x: 'feat/a', y: [5, 8, 10, 12, 18] },
            { x: 'feat/b', y: [8, 12, 15, 18, 28] },
            { x: 'feat/c', y: [9, 13, 17, 20, 30] },
            { x: 'release', y: [10, 14, 18, 22, 32] }
        ]
    }];
</script>
