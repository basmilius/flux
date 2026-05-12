<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Order distribution"
            :aspect-ratio="3">
            <FluxStatisticsScatterChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series = [
        {
            name: 'Group A',
            data: [[12, 32], [18, 45], [25, 38], [31, 52], [38, 41], [44, 60], [52, 49], [60, 65]]
        },
        {
            name: 'Group B',
            data: [[10, 22], [16, 30], [23, 27], [29, 38], [36, 33], [42, 45], [50, 39], [58, 52]]
        }
    ];
</script>
