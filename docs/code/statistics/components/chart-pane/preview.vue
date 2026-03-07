<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsDonutChart
                :options="{
                    colors: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
                    grid: {padding: {top: 21, left: 15, right: 15, bottom: 15}},
                    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other']
                }"
                :series="[32, 24, 16, 12, 10, 6]"/>

            <template #legend>
                <FluxStatisticsLegend>
                    <FluxStatisticsLegendItem
                        color="primary"
                        label="Electronics"
                        value="32%"/>
                    <FluxStatisticsLegendItem
                        color="#10b981"
                        label="Clothing"
                        value="24%"/>
                    <FluxStatisticsLegendItem
                        color="#3b82f6"
                        label="Books"
                        value="16%"/>
                    <FluxStatisticsLegendItem
                        color="#f59e0b"
                        label="Home & Garden"
                        value="12%"/>
                    <FluxStatisticsLegendItem
                        color="#8b5cf6"
                        label="Sports"
                        value="10%"/>
                    <FluxStatisticsLegendItem
                        color="#ec4899"
                        label="Other"
                        value="6%"/>
                </FluxStatisticsLegend>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
