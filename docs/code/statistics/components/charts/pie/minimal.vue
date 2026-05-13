<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Storage breakdown"
        :aspect-ratio="1.5">
        <FluxStatisticsPieChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsPieChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Used', value: 64 },
        { label: 'Free', value: 36 }
    ];
</script>
