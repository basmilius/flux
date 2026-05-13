<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Sales by category"
            :aspect-ratio="1.5">
            <FluxStatisticsPieChart :slices="slices"/>

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
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsPieChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Electronics', value: 38, color: 'primary', icon: 'laptop' },
        { label: 'Clothing', value: 27, color: '#10b981', icon: 'shirt' },
        { label: 'Books', value: 20, color: '#3b82f6', icon: 'book' },
        { label: 'Other', value: 15, color: '#f59e0b', icon: 'cubes' }
    ];
</script>
