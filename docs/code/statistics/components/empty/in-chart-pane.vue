<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Order distribution"
        :aspect-ratio="2.4">
        <FluxStatisticsEmpty
            icon="chart-pie"
            title="Not enough data"
            description="Distribution becomes available after at least 25 orders."/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsEmpty } from '@flux-ui/statistics';
</script>
