<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Browser share"
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
        { name: 'Chrome', value: 62, color: 'primary' },
        { name: 'Safari', value: 19, color: 'info' },
        { name: 'Edge', value: 10, color: 'success' },
        { name: 'Firefox', value: 6, color: 'warning' },
        { name: 'Other', value: 3, color: 'gray' }
    ];
</script>
