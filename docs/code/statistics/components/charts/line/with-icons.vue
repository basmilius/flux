<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Channel performance"
        :aspect-ratio="3">
        <FluxStatisticsLineChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLineChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartLineSeries[] = [
        {
            name: 'Email',
            color: 'primary',
            icon: 'paper-plane',
            data: [320, 410, 380, 510, 470, 620, 540, 680]
        },
        {
            name: 'Search',
            color: 'success',
            icon: 'magnifying-glass',
            data: [180, 240, 215, 290, 270, 360, 320, 410]
        },
        {
            name: 'Social',
            color: 'warning',
            icon: 'message',
            data: [90, 132, 118, 165, 150, 198, 180, 232]
        }
    ];
</script>
