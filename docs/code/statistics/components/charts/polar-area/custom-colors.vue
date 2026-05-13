<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Operational status"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Healthy', value: 62, color: 'success' },
        { label: 'Degraded', value: 24, color: 'warning' },
        { label: 'Down', value: 10, color: 'danger' },
        { label: 'Unknown', value: 4, color: 'gray' }
    ];
</script>
