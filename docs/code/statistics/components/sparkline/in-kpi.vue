<template>
    <FluxStatisticsGrid
        :xs="1"
        :md="3"
        style="min-width: 100%">
        <FluxStatisticsMetric
            icon="arrow-trend-up"
            title="MRR"
            label="This month"
            value="$24,820"
            :change="{ color: 'success', icon: 'arrow-trend-up', value: '+12.3%' }">
            <FluxStatisticsSparkline
                color="success"
                variant="area"
                :series="mrr"/>
        </FluxStatisticsMetric>

        <FluxStatisticsMetric
            icon="cart-shopping"
            title="Orders"
            label="This month"
            value="2,142"
            :change="{ color: 'danger', icon: 'arrow-trend-down', value: '-4.1%' }">
            <FluxStatisticsSparkline
                color="danger"
                variant="line"
                :series="orders"/>
        </FluxStatisticsMetric>

        <FluxStatisticsMetric
            icon="user-plus"
            title="Signups"
            label="This month"
            value="318"
            :change="{ color: 'success', icon: 'arrow-trend-up', value: '+6.7%' }">
            <FluxStatisticsSparkline
                color="primary"
                variant="line"
                :series="signups"/>
        </FluxStatisticsMetric>
    </FluxStatisticsGrid>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsGrid, FluxStatisticsMetric, FluxStatisticsSparkline } from '@flux-ui/statistics';

    const mrr = [{ name: 'MRR', data: [18, 19, 20, 21, 22, 23, 24, 25] }];
    const orders = [{ name: 'Orders', data: [2400, 2380, 2320, 2280, 2210, 2180, 2160, 2142] }];
    const signups = [{ name: 'Signups', data: [42, 48, 54, 51, 58, 66, 72, 80] }];
</script>
