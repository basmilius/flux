<template>
    <FluxStatisticsLegend>
        <FluxStatisticsLegendItem
            color="primary"
            label="This year"/>
        <FluxStatisticsLegendItem
            color="#10b981"
            label="Last year"/>
    </FluxStatisticsLegend>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
