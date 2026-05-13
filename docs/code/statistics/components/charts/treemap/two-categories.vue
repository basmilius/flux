<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Revenue split"
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
        { name: 'Subscriptions', value: 8200, color: 'primary' },
        { name: 'One-off', value: 3100, color: 'gray' }
    ];
</script>
