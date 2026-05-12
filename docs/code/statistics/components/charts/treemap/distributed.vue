<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Top countries"
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
            { x: 'NL', y: 4200 },
            { x: 'DE', y: 3100 },
            { x: 'BE', y: 1800 },
            { x: 'FR', y: 1500 },
            { x: 'UK', y: 1200 },
            { x: 'ES', y: 800 }
        ]
    }];
</script>
