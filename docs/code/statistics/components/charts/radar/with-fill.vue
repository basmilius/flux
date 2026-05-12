<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Feature coverage"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Coverage',
        data: [75, 90, 60, 80, 70, 85]
    }];

    const options: ApexOptions = {
        labels: ['Auth', 'API', 'UI', 'Storage', 'Sync', 'Search'],
        fill: {
            opacity: 0.55
        },
        stroke: {
            width: 3
        }
    };
</script>
