<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Sales by category"
        :aspect-ratio="1.5">
        <FluxStatisticsPieChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsPieChart } from '@flux-ui/statistics';

    const series = [{
        color: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b'],
        data: [
            { value: 38, name: 'Electronics' },
            { value: 27, name: 'Clothing' },
            { value: 20, name: 'Books' },
            { value: 15, name: 'Other' }
        ]
    }];
</script>
