<template>
    <Preview>
        <FluxStatisticsBase
            icon="server"
            title="System resources"
            style="min-width: 100%; max-width: 360px">
            <template #info>
                Measured over the past 24 hours.
            </template>

            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsMeter
                    color="success"
                    title="CPU"
                    tip="of 100%"
                    :value="0.62"/>

                <FluxStatisticsMeter
                    color="warning"
                    title="Memory"
                    tip="of 32 GB"
                    :value="0.78"/>
            </FluxFlex>
        </FluxStatisticsBase>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
