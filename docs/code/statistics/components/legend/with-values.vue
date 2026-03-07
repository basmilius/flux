<template>
    <FluxStatisticsLegend>
        <FluxStatisticsLegendItem
            color="primary"
            label="Electronics"
            value="38%"/>
        <FluxStatisticsLegendItem
            color="#10b981"
            label="Clothing"
            value="27%"/>
        <FluxStatisticsLegendItem
            color="#3b82f6"
            label="Books"
            value="20%"/>
        <FluxStatisticsLegendItem
            color="#f59e0b"
            label="Other"
            value="15%"/>
    </FluxStatisticsLegend>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
