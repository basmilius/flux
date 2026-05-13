<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Disk usage"
        :aspect-ratio="1.5">
        <FluxStatisticsDonutChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Used', value: 78, color: 'primary' },
        { label: 'Free', value: 22, color: 'gray' }
    ];
</script>
