<template>
    <FluxStatisticsBase
        style="min-width: 100%; max-width: 360px"
        title="System resources">
        <FluxStack>
            <FluxStatisticsMeter
                is-small
                color="success"
                style="width: 210px"
                tip="CPU"
                :value="0.68"/>

            <FluxStatisticsMeter
                is-small
                color="warning"
                style="width: 210px"
                tip="Disk"
                :value="0.74"/>

            <FluxStatisticsMeter
                is-small
                color="info"
                style="width: 210px"
                tip="Memory"
                :value="0.45"/>
        </FluxStack>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
