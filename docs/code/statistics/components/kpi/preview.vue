<template>
    <Preview>
        <FluxStack style="width: 100%; max-width: 360px">
            <FluxStatisticsKpi
                style="min-width: 100%"
                icon="users"
                title="Total users"
                value="12,430"
                footer="vs. last month"
                :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.2%'}"/>

            <FluxStatisticsKpi
                style="min-width: 100%"
                icon="cart-shopping"
                title="Orders"
                value="3,821"
                footer="vs. last month"
                :change="{color: 'danger', icon: 'arrow-trend-down', value: '-1.4%'}"/>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '@flux-ui/components';
    import { FluxStatisticsKpi } from '@flux-ui/statistics';
</script>
