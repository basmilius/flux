<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Price vs. rating"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartScatterSeries[] = [{
        name: 'Products',
        data: [
            { x: 15, y: 3.2 }, { x: 22, y: 3.6 }, { x: 28, y: 3.9 }, { x: 35, y: 4.1 },
            { x: 42, y: 4.3 }, { x: 55, y: 4.5 }, { x: 68, y: 4.6 }, { x: 80, y: 4.7 }, { x: 95, y: 4.8 }
        ]
    }];
</script>
