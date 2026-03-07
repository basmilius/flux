<template>
    <FluxStatisticsMetric
        style="min-width: 100%; max-width: 360px"
        icon="chart-line"
        title="Monthly revenue"
        label="Total earned this month"
        value="€ 48,290"
        footer="vs. last month"
        :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}">
        <small>Products</small>
        <span>€ 31,800</span>
        <small>Services</small>
        <span>€ 16,490</span>
    </FluxStatisticsMetric>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsMetric } from '@flux-ui/statistics';
</script>
