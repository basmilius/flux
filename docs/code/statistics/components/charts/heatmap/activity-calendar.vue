<template>
    <FluxStatisticsChartPane
        icon="calendar"
        title="Contribution graph"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { emerald100, emerald300, emerald500, emerald700 } from '@flux-ui/internals';
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const days = ['Mon', 'Wed', 'Fri', 'Sun'];

    const series = days.map(name => ({
        name,
        data: Array.from({ length: 24 }, (_, i) => ({
            x: `W${i + 1}`,
            y: Math.round(Math.random() * 12)
        }))
    }));

    const options: ApexOptions = {
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [
                        { from: 0, to: 2, color: emerald100 },
                        { from: 3, to: 5, color: emerald300 },
                        { from: 6, to: 8, color: emerald500 },
                        { from: 9, to: 12, color: emerald700 }
                    ]
                }
            }
        }
    };
</script>
