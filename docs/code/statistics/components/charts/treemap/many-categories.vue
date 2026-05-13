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
            { value: 220, name: 'Tag A' },
            { value: 180, name: 'Tag B' },
            { value: 160, name: 'Tag C' },
            { value: 140, name: 'Tag D' },
            { value: 120, name: 'Tag E' },
            { value: 100, name: 'Tag F' },
            { value: 85, name: 'Tag G' },
            { value: 70, name: 'Tag H' },
            { value: 55, name: 'Tag I' },
            { value: 40, name: 'Tag J' },
            { value: 30, name: 'Tag K' },
            { value: 20, name: 'Tag L' }
        ]
    }];
</script>
