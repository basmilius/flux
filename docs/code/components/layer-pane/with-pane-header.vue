<template>
    <FluxLayerPane>
        <FluxPaneHeader
            icon="chart-line"
            title="Performance"/>

        <FluxPane>
            <FluxItemStack>
                <FluxItem
                    v-for="metric in metrics"
                    :key="metric.label">
                    <FluxItemContent>
                        <strong>{{ metric.label }}</strong>
                        <span>{{ metric.description }}</span>
                    </FluxItemContent>

                    <FluxItemActions is-center>
                        <FluxBadge
                            :color="metric.color"
                            :label="metric.value"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { FluxBadge, FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxLayerPane, FluxPane, FluxPaneHeader } from '@flux-ui/components';

    const metrics: { label: string; description: string; value: string; color: FluxColor }[] = [
        {label: 'Revenue', description: 'Total revenue this period', value: '+12%', color: 'success'},
        {label: 'Orders', description: 'Number of orders placed', value: '+4%', color: 'success'},
        {label: 'Refunds', description: 'Refunds processed', value: '-2%', color: 'danger'}
    ];
</script>
