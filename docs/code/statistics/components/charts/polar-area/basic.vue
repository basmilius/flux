<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Inventory"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const series = [30, 24, 18, 14, 9];

    const options: ApexOptions = {
        labels: ['Books', 'Music', 'Movies', 'Games', 'Other']
    };
</script>
