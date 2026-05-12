<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-bar"
            title="Response times"
            :aspect-ratio="3">
            <FluxStatisticsBoxPlotChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'ms',
        data: [
            { x: 'API', y: [54, 66, 82, 88, 120] },
            { x: 'DB', y: [22, 30, 38, 44, 60] },
            { x: 'Cache', y: [4, 6, 8, 12, 18] },
            { x: 'Worker', y: [110, 130, 152, 168, 210] },
            { x: 'Search', y: [38, 52, 64, 78, 96] }
        ]
    }];
</script>
