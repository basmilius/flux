<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Revenue by segment"
            :aspect-ratio="1.4">
            <FluxStatisticsPolarAreaChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { value: 44, name: 'Retail' },
            { value: 55, name: 'B2B' },
            { value: 13, name: 'Marketplace' },
            { value: 33, name: 'Subscriptions' },
            { value: 22, name: 'Services' }
        ]
    }];
</script>
