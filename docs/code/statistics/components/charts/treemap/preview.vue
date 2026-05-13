<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="rectangle-history"
            title="Storage usage"
            :aspect-ratio="2.4">
            <FluxStatisticsTreemapChart :nodes="nodes"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const nodes: FluxStatisticsChartTreemapNode[] = [
        { name: 'Documents', value: 320 },
        { name: 'Photos', value: 540 },
        { name: 'Videos', value: 780 },
        { name: 'Music', value: 210 },
        { name: 'Apps', value: 150 },
        { name: 'System', value: 90 },
        { name: 'Other', value: 60 }
    ];
</script>
