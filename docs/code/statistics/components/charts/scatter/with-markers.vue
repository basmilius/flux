<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Sparse sample"
        :aspect-ratio="3">
        <FluxStatisticsScatterChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsScatterChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Samples',
        data: [[20, 30], [40, 60], [60, 35], [80, 70], [100, 50]]
    }];

    const options: ApexOptions = {
        markers: {
            size: 10,
            strokeWidth: 2,
            strokeColors: 'var(--surface)',
            hover: {
                sizeOffset: 4
            }
        }
    };
</script>
