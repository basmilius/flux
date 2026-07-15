<template>
    <FluxStatisticsGrid
        :xs="1"
        :md="3"
        style="min-width: 100%">
        <FluxStatisticsKpi
            icon="users"
            title="Total users"
            value="12,430"
            footer="vs. last month"
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.2%'}"/>

        <FluxStatisticsMetric
            icon="money-bill"
            title="Revenue"
            label="This month"
            value="€ 48,290"
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}">
            <FluxStatisticsSparkline
                color="success"
                variant="area"
                :series="revenue"/>
        </FluxStatisticsMetric>

        <FluxStatisticsBase
            icon="server"
            title="Capacity">
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsMeter
                    variant="blocks"
                    color="info"
                    title="CPU"
                    tip="of 100%"
                    :value="0.62"/>

                <FluxStatisticsMeter
                    variant="blocks"
                    color="warning"
                    title="Memory"
                    tip="of 64 GB"
                    :value="0.78"/>
            </FluxFlex>
        </FluxStatisticsBase>
    </FluxStatisticsGrid>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsMeter, FluxStatisticsMetric, FluxStatisticsSparkline } from '@flux-ui/statistics';

    const revenue = [{ name: 'Revenue', data: [38, 41, 39, 44, 46, 45, 47, 48] }];
</script>
