<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Tag distribution"
        :aspect-ratio="2.4">
        <FluxStatisticsTreemapChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { x: 'Tag A', y: 220 },
            { x: 'Tag B', y: 180 },
            { x: 'Tag C', y: 160 },
            { x: 'Tag D', y: 140 },
            { x: 'Tag E', y: 120 },
            { x: 'Tag F', y: 100 },
            { x: 'Tag G', y: 85 },
            { x: 'Tag H', y: 70 },
            { x: 'Tag I', y: 55 },
            { x: 'Tag J', y: 40 },
            { x: 'Tag K', y: 30 },
            { x: 'Tag L', y: 20 }
        ]
    }];
</script>
