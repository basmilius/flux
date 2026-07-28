<template>
    <FluxStatisticsBase
        is-small
        icon="database"
        title="Storage"
        style="min-width: 100%; max-width: 300px">
        <FluxStatisticsMeter
            color="info"
            title="Used"
            tip="of 500 GB"
            :value="0.41"/>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
