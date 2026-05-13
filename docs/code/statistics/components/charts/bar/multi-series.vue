<template>
    <FluxStatisticsChartPane
        icon="chart-bar"
        title="Orders comparison"
        :aspect-ratio="2.5">
        <FluxStatisticsBarChart
            :options="{
                xAxis: {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
            }"
            :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBarChart, FluxStatisticsChartPane, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series = [
        {
            name: 'This year',
            data: [320, 410, 380, 510, 470, 620, 540, 680, 590, 730, 690, 810]
        },
        {
            name: 'Last year',
            data: [260, 340, 310, 430, 390, 520, 450, 570, 490, 620, 580, 700]
        }
    ];
</script>
