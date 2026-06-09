<template>
    <FluxStatisticsLegend>
        <FluxStatisticsLegendItem
            color="primary"
            label="Revenue"
            value="€ 48,290"/>
        <FluxStatisticsLegendItem
            color="success"
            label="Profit"
            value="€ 12,840"/>
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
