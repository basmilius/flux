<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Team allocation"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Engineering', value: 52 },
        { label: 'Design', value: 28 },
        { label: 'Support', value: 18 }
    ];
</script>
