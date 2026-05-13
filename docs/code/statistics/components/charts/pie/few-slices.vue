<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Subscription split"
        :aspect-ratio="1.5">
        <FluxStatisticsPieChart :slices="slices"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsPieChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Active', value: 68, color: 'success' },
        { label: 'Trialing', value: 22, color: 'info' },
        { label: 'Churned', value: 10, color: 'danger' }
    ];
</script>
