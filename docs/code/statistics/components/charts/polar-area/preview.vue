<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Revenue by segment"
            :aspect-ratio="1.4">
            <FluxStatisticsPolarAreaChart
                :series="series"
                :options="options"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const series = [44, 55, 13, 33, 22];

    const options: ApexOptions = {
        labels: ['Retail', 'B2B', 'Marketplace', 'Subscriptions', 'Services']
    };
</script>
