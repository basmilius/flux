<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Channel mix"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :slices="slices"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Email', value: 38, color: 'primary', icon: 'paper-plane' },
        { label: 'Search', value: 52, color: 'success', icon: 'magnifying-glass' },
        { label: 'Direct', value: 22, color: 'info', icon: 'globe' },
        { label: 'Social', value: 18, color: 'warning', icon: 'message' }
    ];
</script>
