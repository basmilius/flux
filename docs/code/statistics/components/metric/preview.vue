<template>
    <Preview>
        <FluxStack style="width: 100%; max-width: 360px">
            <FluxStatisticsMetric
                style="min-width: 100%"
                icon="chart-line"
                title="Monthly revenue"
                label="Total earned this month"
                value="€ 48,290"
                footer="vs. last month"
                :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}"/>

            <FluxStatisticsMetric
                style="min-width: 100%"
                icon="users"
                title="Active users"
                label="Unique visitors"
                value="9,841"
                footer="vs. last month"
                :change="{color: 'success', icon: 'arrow-trend-up', value: '+3.1%'}"/>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '@flux-ui/components';
    import { FluxStatisticsMetric } from '@flux-ui/statistics';
</script>
