<template>
    <FluxStatisticsChartPane
        icon="chart-pie"
        title="Country distribution"
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
            { value: 42, name: 'NL' },
            { value: 28, name: 'DE' },
            { value: 22, name: 'BE' },
            { value: 18, name: 'FR' },
            { value: 14, name: 'UK' },
            { value: 11, name: 'ES' },
            { value: 9, name: 'IT' },
            { value: 7, name: 'PL' },
            { value: 5, name: 'SE' },
            { value: 3, name: 'DK' }
        ]
    }];
</script>
