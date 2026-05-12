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
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Products',
        data: [[15, 3.2], [22, 3.6], [28, 3.9], [35, 4.1], [42, 4.3], [55, 4.5], [68, 4.6], [80, 4.7], [95, 4.8]]
    }];
</script>
