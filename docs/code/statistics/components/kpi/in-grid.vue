<template>
    <FluxStatisticsGrid
        :xs="1"
        :sm="2"
        :md="3"
        style="min-width: 100%">
        <FluxStatisticsKpi
            icon="users"
            title="Total users"
            value="12,430"
            footer="vs. last month"
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.2%'}"/>

        <FluxStatisticsKpi
            icon="cart-shopping"
            title="Orders"
            value="3,821"
            footer="vs. last month"
            :change="{color: 'danger', icon: 'arrow-trend-down', value: '-1.4%'}"/>

        <FluxStatisticsKpi
            icon="money-bill"
            title="Revenue"
            value="€ 48,290"
            footer="vs. last month"
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}"/>
    </FluxStatisticsGrid>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsGrid, FluxStatisticsKpi } from '@flux-ui/statistics';
</script>
