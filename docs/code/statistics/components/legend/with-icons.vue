<template>
    <FluxStatisticsLegend>
        <FluxStatisticsLegendItem
            icon="money-bill"
            label="Revenue"
            value="€ 48,290"/>
        <FluxStatisticsLegendItem
            icon="cart-shopping"
            label="Orders"
            value="3,821"/>
        <FluxStatisticsLegendItem
            icon="users"
            label="Customers"
            value="1,204"/>
    </FluxStatisticsLegend>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
