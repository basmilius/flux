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
            { value: 320, name: 'Documents' },
            { value: 540, name: 'Photos' },
            { value: 780, name: 'Videos' },
            { value: 210, name: 'Music' },
            { value: 150, name: 'Apps' },
            { value: 90, name: 'System' },
            { value: 60, name: 'Other' }
        ]
    }];
</script>
