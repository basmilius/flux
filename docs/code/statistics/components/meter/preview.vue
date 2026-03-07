<template>
    <Preview>
        <FluxStatisticsBase title="System resources">
            <FluxStack>
                <FluxStatisticsMeter
                    color="success"
                    icon="server"
                    title="CPU usage"
                    sub-title="4 cores"
                    tip="of 100%"
                    footer="Load average: 1.2"
                    :value="0.68"/>

                <FluxStatisticsMeter
                    color="warning"
                    icon="database"
                    title="Disk usage"
                    sub-title="SSD"
                    tip="of 500 GB"
                    footer="374 GB used"
                    :value="0.74"/>
            </FluxStack>
        </FluxStatisticsBase>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsMeter } from '@flux-ui/statistics';
</script>
