<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Performance grid"
        :aspect-ratio="2.4">
        <FluxStatisticsHeatmapChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { amber500, green500, red500 } from '@flux-ui/internals';
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const series = ['Server A', 'Server B', 'Server C', 'Server D'].map(name => ({
        name,
        data: Array.from({ length: 10 }, (_, i) => ({
            x: `T${i + 1}`,
            y: Math.round(Math.random() * 100)
        }))
    }));

    const options: ApexOptions = {
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [
                        { from: 0, to: 33, color: red500 },
                        { from: 34, to: 66, color: amber500 },
                        { from: 67, to: 100, color: green500 }
                    ]
                }
            }
        }
    };
</script>
