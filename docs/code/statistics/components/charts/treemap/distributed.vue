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
            { value: 4200, name: 'NL' },
            { value: 3100, name: 'DE' },
            { value: 1800, name: 'BE' },
            { value: 1500, name: 'FR' },
            { value: 1200, name: 'UK' },
            { value: 800, name: 'ES' }
        ]
    }];
</script>
