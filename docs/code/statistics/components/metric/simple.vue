<template>
    <FluxStatisticsMetric
        style="min-width: 100%; max-width: 360px"
        icon="folder"
        title="Active projects"
        label="Across all teams"
        value="18"
        footer="vs. last month"
        :change="{color: 'success', icon: 'arrow-trend-up', value: '+3'}"/>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsMetric } from '@flux-ui/statistics';
</script>
