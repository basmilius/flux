<template>
    <FluxStatisticsMetric
        style="min-width: 100%; max-width: 360px"
        icon="database"
        title="Storage"
        label="Team workspace"
        value="374 GB"
        footer="of 500 GB">
        <FluxStatisticsMeter
            variant="blocks"
            color="warning"
            :value="0.74"/>
    </FluxStatisticsMetric>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsMeter, FluxStatisticsMetric } from '@flux-ui/statistics';
</script>
