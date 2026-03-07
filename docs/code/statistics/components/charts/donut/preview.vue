<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Traffic sources"
            :aspect-ratio="1.5">
            <FluxStatisticsDonutChart
                :options="{
                    colors: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b'],
                    grid: {padding: {top: 21, left: 15, right: 15, bottom: 15}},
                    labels: ['Organic', 'Direct', 'Referral', 'Social']
                }"
                :series="[44, 28, 18, 10]"/>

            <template #legend>
                <FluxStatisticsLegend>
                    <FluxStatisticsLegendItem
                        color="primary"
                        label="Organic"
                        value="44%"/>
                    <FluxStatisticsLegendItem
                        color="#10b981"
                        label="Direct"
                        value="28%"/>
                    <FluxStatisticsLegendItem
                        color="#3b82f6"
                        label="Referral"
                        value="18%"/>
                    <FluxStatisticsLegendItem
                        color="#f59e0b"
                        label="Social"
                        value="10%"/>
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
