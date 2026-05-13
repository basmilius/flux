<template>
    <FluxStatisticsChartPane
        icon="chart-area"
        title="Storage usage"
        :aspect-ratio="3">
        <FluxStatisticsAreaChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartAreaSeries } from '@flux-ui/types';
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series: FluxStatisticsChartAreaSeries[] = [
        {
            name: 'Documents',
            icon: 'file-lines',
            color: 'primary',
            data: [120, 180, 230, 290, 360, 420, 510, 590]
        },
        {
            name: 'Media',
            icon: 'image',
            color: 'info',
            data: [200, 280, 380, 470, 580, 690, 820, 940]
        }
    ];
</script>
