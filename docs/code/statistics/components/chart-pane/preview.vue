<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsDonutChart :slices="slices"/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Electronics', value: 32, color: 'primary' },
        { label: 'Clothing', value: 24, color: '#10b981' },
        { label: 'Books', value: 16, color: '#3b82f6' },
        { label: 'Home & Garden', value: 12, color: '#f59e0b' },
        { label: 'Sports', value: 10, color: '#8b5cf6' },
        { label: 'Other', value: 6, color: '#ec4899' }
    ];
</script>
