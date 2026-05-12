<template>
    <FluxStatisticsChartPane
        icon="bars"
        title="Gantt schedule"
        :aspect-ratio="2.4">
        <FluxStatisticsRangeBarChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRangeBarChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Tasks',
        data: [
            { x: 'Setup repo', y: [new Date(2026, 0, 4).getTime(), new Date(2026, 0, 6).getTime()] },
            { x: 'Auth', y: [new Date(2026, 0, 6).getTime(), new Date(2026, 0, 14).getTime()] },
            { x: 'Database', y: [new Date(2026, 0, 8).getTime(), new Date(2026, 0, 22).getTime()] },
            { x: 'UI shell', y: [new Date(2026, 0, 15).getTime(), new Date(2026, 0, 28).getTime()] },
            { x: 'Integration', y: [new Date(2026, 0, 24).getTime(), new Date(2026, 1, 8).getTime()] }
        ]
    }];

    const options: ApexOptions = {
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
                borderRadius: 4
            }
        }
    };
</script>
