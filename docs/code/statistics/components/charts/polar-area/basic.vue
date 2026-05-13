<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Inventory"
        :aspect-ratio="1.4">
        <FluxStatisticsPolarAreaChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { value: 30, name: 'Books' },
            { value: 24, name: 'Music' },
            { value: 18, name: 'Movies' },
            { value: 14, name: 'Games' },
            { value: 9, name: 'Other' }
        ]
    }];
</script>
