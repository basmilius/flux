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
    import { FluxStatisticsChartPane, FluxStatisticsPieChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Used', value: 64 },
        { label: 'Free', value: 36 }
    ];
</script>
