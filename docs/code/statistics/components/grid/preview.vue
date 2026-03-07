<template>
    <Preview>
        <FluxStatisticsGrid :xs="2" :md="3" style="min-width: 100%">
            <FluxStatisticsKpi
                icon="users"
                title="Total users"
                value="12,430"
                :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.2%'}"/>

            <FluxStatisticsKpi
                icon="cart-shopping"
                title="Orders"
                value="3,821"
                :change="{color: 'danger', icon: 'arrow-trend-down', value: '-1.4%'}"/>

            <FluxStatisticsKpi
                icon="money-bill"
                title="Revenue"
                value="€ 48,290"
                :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}"/>
        </FluxStatisticsGrid>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsGrid, FluxStatisticsKpi } from '@flux-ui/statistics';
</script>
