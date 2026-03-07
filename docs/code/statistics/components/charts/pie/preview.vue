<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsPieChart
                :options="{
                    colors: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b'],
                    grid: {padding: {top: 21, left: 15, right: 15, bottom: 15}},
                    labels: ['Electronics', 'Clothing', 'Books', 'Other']
                }"
                :series="[38, 27, 20, 15]"/>

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
</script>
