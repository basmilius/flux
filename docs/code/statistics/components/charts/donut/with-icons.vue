<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Devices"
        :aspect-ratio="1.5">
        <FluxStatisticsDonutChart :slices="slices"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Desktop', value: 52, color: 'primary', icon: 'desktop' },
        { label: 'Mobile', value: 36, color: 'info', icon: 'phone' },
        { label: 'Tablet', value: 12, color: 'warning', icon: 'tablet' }
    ];
</script>
