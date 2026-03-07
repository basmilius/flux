<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Active users"
            :aspect-ratio="3">
            <FluxStatisticsLineChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsLineChart } from '@flux-ui/statistics';

    const series = [
        {
            name: 'This year',
            data: [2100, 2800, 3400, 2900, 4100, 3700, 4600, 5200, 4800, 5900, 5400, 6300]
        },
        {
            name: 'Last year',
            data: [1800, 2200, 2600, 2300, 3200, 2900, 3500, 3900, 3600, 4400, 4100, 4800]
        }
    ];
</script>
