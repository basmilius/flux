<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="circle"
            title="Market overview"
            :aspect-ratio="3">
            <FluxStatisticsBubbleChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane } from '@flux-ui/statistics';

    const series = [
        {
            name: 'Group A',
            data: [[10, 30, 12], [25, 45, 18], [40, 28, 26], [55, 60, 22], [70, 38, 30]]
        },
        {
            name: 'Group B',
            data: [[15, 22, 15], [30, 38, 12], [45, 50, 24], [60, 32, 18], [75, 55, 28]]
        }
    ];
</script>
