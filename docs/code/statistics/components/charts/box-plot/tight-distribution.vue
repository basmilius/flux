<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Tight distribution"
        :aspect-ratio="3">
        <FluxStatisticsBoxPlotChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Latency',
        data: [
            { x: 'EU-W1', y: [38, 41, 43, 45, 50] },
            { x: 'EU-C1', y: [40, 42, 44, 46, 49] },
            { x: 'US-E1', y: [85, 88, 90, 93, 96] },
            { x: 'AP-S1', y: [120, 124, 126, 130, 134] }
        ]
    }];
</script>
