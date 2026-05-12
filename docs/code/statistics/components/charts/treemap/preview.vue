<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="rectangle-history"
            title="Storage usage"
            :aspect-ratio="2.4">
            <FluxStatisticsTreemapChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { x: 'Documents', y: 320 },
            { x: 'Photos', y: 540 },
            { x: 'Videos', y: 780 },
            { x: 'Music', y: 210 },
            { x: 'Apps', y: 150 },
            { x: 'System', y: 90 },
            { x: 'Other', y: 60 }
        ]
    }];
</script>
