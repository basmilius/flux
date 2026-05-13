<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsDonutChart :series="series"/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series = [{
        color: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
        data: [
            { value: 32, name: 'Electronics' },
            { value: 24, name: 'Clothing' },
            { value: 16, name: 'Books' },
            { value: 12, name: 'Home & Garden' },
            { value: 10, name: 'Sports' },
            { value: 6, name: 'Other' }
        ]
    }];
</script>
