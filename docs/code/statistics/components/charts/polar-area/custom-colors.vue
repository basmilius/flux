<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Operational status"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const series = [{
        color: ['var(--success-500)', 'var(--warning-500)', 'var(--danger-500)', 'var(--gray-400)'],
        data: [
            { value: 62, name: 'Healthy' },
            { value: 24, name: 'Degraded' },
            { value: 10, name: 'Down' },
            { value: 4, name: 'Unknown' }
        ]
    }];
</script>
