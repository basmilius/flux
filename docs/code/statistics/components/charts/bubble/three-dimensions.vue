<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Companies"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [{
        name: 'Market cap',
        data: [
            [12, 8, 24],
            [22, 14, 18],
            [32, 26, 12],
            [42, 18, 30],
            [52, 32, 22],
            [62, 24, 16],
            [72, 40, 28]
        ]
    }];
</script>
