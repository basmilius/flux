<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Operational status"
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

    const series = [62, 24, 10, 4];

    const options: ApexOptions = {
        labels: ['Healthy', 'Degraded', 'Down', 'Unknown'],
        colors: ['var(--success-500)', 'var(--warning-500)', 'var(--danger-500)', 'var(--gray-400)']
    };
</script>
