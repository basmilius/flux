<template>
    <FluxStatisticsBase
        style="min-width: 100%; max-width: 360px"
        title="Usage this month">
        <FluxFlex
            direction="vertical"
            :gap="18">
            <FluxStatisticsMeter
                variant="blocks"
                color="primary"
                title="Documents"
                tip="of 40"
                :value="0.58"/>

            <FluxStatisticsMeter
                variant="blocks"
                color="success"
                title="Weekly reports"
                tip="of 25"
                :value="0.64"/>

            <FluxStatisticsMeter
                variant="blocks"
                color="warning"
                title="Pitch briefs"
                tip="of 20"
                :value="0.8"/>
        </FluxFlex>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
