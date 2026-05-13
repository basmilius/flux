<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Top countries"
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
        { name: 'NL', value: 4200 },
        { name: 'DE', value: 3100 },
        { name: 'BE', value: 1800 },
        { name: 'FR', value: 1500 },
        { name: 'UK', value: 1200 },
        { name: 'ES', value: 800 }
    ];
</script>
