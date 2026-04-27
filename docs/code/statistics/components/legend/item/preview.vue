<template>
    <Preview>
        <FluxStatisticsLegend>
            <FluxStatisticsLegendItem
                color="primary"
                label="Revenue"
                value="€ 48,290"/>
            <FluxStatisticsLegendItem
                icon="cart-shopping"
                label="Orders"
                value="3,821"/>
        </FluxStatisticsLegend>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
