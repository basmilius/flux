<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Storage hierarchy"
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
        {
            name: 'Media',
            value: 1800,
            color: 'primary',
            children: [
                { name: 'Photos', value: 1100 },
                { name: 'Videos', value: 600 },
                { name: 'Music', value: 100 }
            ]
        },
        {
            name: 'Documents',
            value: 540,
            color: 'info',
            children: [
                { name: 'PDF', value: 280 },
                { name: 'Text', value: 180 },
                { name: 'Other', value: 80 }
            ]
        },
        {
            name: 'Apps',
            value: 320,
            color: 'success',
            children: [
                { name: 'System', value: 180 },
                { name: 'Installed', value: 140 }
            ]
        }
    ];
</script>
