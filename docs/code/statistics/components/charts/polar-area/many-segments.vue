<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Country distribution"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :slices="slices"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'NL', value: 42 },
        { label: 'DE', value: 28 },
        { label: 'BE', value: 22 },
        { label: 'FR', value: 18 },
        { label: 'UK', value: 14 },
        { label: 'ES', value: 11 },
        { label: 'IT', value: 9 },
        { label: 'PL', value: 7 },
        { label: 'SE', value: 5 },
        { label: 'DK', value: 3 }
    ];
</script>
