<template>
    <Preview>
        <FluxStatisticsLegend>
            <FluxStatisticsLegendItem
                color="primary"
                label="Revenue"
                value="€ 48,290"/>
            <FluxStatisticsLegendItem
                color="success"
                label="Orders"
                value="3,821"/>
            <FluxStatisticsLegendItem
                color="info"
                label="New users"
                value="1,204"/>
        </FluxStatisticsLegend>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
