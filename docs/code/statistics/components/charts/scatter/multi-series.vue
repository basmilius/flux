<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Customer segments"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series = [
        { name: 'New', data: [[10, 14], [20, 22], [30, 18], [40, 26], [50, 33]] },
        { name: 'Returning', data: [[12, 30], [25, 38], [38, 41], [48, 47], [60, 55]] },
        { name: 'VIP', data: [[18, 65], [32, 72], [44, 80], [56, 85], [70, 92]] }
    ];
</script>
