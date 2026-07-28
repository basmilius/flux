<template>
    <FluxStatisticsBase
        is-loading
        icon="server"
        title="System resources"
        style="min-width: 100%; max-width: 360px">
        <FluxStatisticsMeter
            color="success"
            title="CPU"
            tip="of 100%"
            :value="0.62"/>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
