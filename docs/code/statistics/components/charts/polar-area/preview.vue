<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Revenue by segment"
            :aspect-ratio="1.4">
            <FluxStatisticsPolarAreaChart :slices="slices"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Retail', value: 44 },
        { label: 'B2B', value: 55 },
        { label: 'Marketplace', value: 13 },
        { label: 'Subscriptions', value: 33 },
        { label: 'Services', value: 22 }
    ];
</script>
