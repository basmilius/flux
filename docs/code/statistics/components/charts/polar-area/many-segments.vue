<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Country distribution"
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

    const series = [42, 28, 22, 18, 14, 11, 9, 7, 5, 3];

    const options: ApexOptions = {
        labels: ['NL', 'DE', 'BE', 'FR', 'UK', 'ES', 'IT', 'PL', 'SE', 'DK']
    };
</script>
