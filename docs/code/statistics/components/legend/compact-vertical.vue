<template>
    <FluxStatisticsLegend
        variant="compact"
        direction="vertical">
        <FluxStatisticsLegendItem
            color="primary"
            label="Components"/>
        <FluxStatisticsLegendItem
            color="#10b981"
            label="Dashboard"/>
        <FluxStatisticsLegendItem
            color="#3b82f6"
            label="Internals"/>
        <FluxStatisticsLegendItem
            color="#f59e0b"
            label="Types"/>
    </FluxStatisticsLegend>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
