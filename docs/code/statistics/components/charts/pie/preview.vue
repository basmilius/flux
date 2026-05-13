<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsPieChart :series="series"/>

            <template #legend>
                <FluxStatisticsLegend>
                    <FluxStatisticsLegendItem
                        color="primary"
                        label="Electronics"
                        value="38%"/>
                    <FluxStatisticsLegendItem
                        color="#10b981"
                        label="Clothing"
                        value="27%"/>
                    <FluxStatisticsLegendItem
                        color="#3b82f6"
                        label="Books"
                        value="20%"/>
                    <FluxStatisticsLegendItem
                        color="#f59e0b"
                        label="Other"
                        value="15%"/>
                </FluxStatisticsLegend>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsPieChart } from '@flux-ui/statistics';

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
