<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Traffic sources"
        :aspect-ratio="1.5">
        <FluxStatisticsDonutChart
            tooltip
            :slices="slices"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Organic', value: 44, color: 'primary' },
        { label: 'Direct', value: 28, color: '#10b981' },
        { label: 'Referral', value: 18, color: '#3b82f6' },
        { label: 'Social', value: 10, color: '#f59e0b' }
    ];
</script>
