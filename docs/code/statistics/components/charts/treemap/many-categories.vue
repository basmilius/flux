<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Tag distribution"
        :aspect-ratio="2.4">
        <FluxStatisticsTreemapChart :nodes="nodes"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const nodes: FluxStatisticsChartTreemapNode[] = [
        { name: 'Tag A', value: 220 },
        { name: 'Tag B', value: 180 },
        { name: 'Tag C', value: 160 },
        { name: 'Tag D', value: 140 },
        { name: 'Tag E', value: 120 },
        { name: 'Tag F', value: 100 },
        { name: 'Tag G', value: 85 },
        { name: 'Tag H', value: 70 },
        { name: 'Tag I', value: 55 },
        { name: 'Tag J', value: 40 },
        { name: 'Tag K', value: 30 },
        { name: 'Tag L', value: 20 }
    ];
</script>
