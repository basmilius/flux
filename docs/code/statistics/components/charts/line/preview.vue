<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Active users"
            :aspect-ratio="3">
            <FluxStatisticsLineChart :series="series"/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLineChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartLineSeries[] = [
        {
            name: 'This year',
            color: '#f97316',
            icon: 'arrow-trend-up',
            data: [2100, 2800, 3400, 2900, 4100, 3700, 4600, 5200, 4800, 5900, 5400, 6300]
        },
        {
            name: 'Last year',
            color: '#0ea5e9',
            icon: 'arrow-trend-down',
            data: [1800, 2200, 2600, 2300, 3200, 2900, 3500, 3900, 3600, 4400, 4100, 4800]
        }
    ];
</script>
