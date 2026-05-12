<template>
    <FluxStatisticsChartPane
        icon="grid-2"
        title="Hourly traffic"
        :aspect-ratio="3">
        <FluxStatisticsHeatmapChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { violet100, violet300, violet500, violet700 } from '@flux-ui/internals';
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Traffic',
        data: Array.from({ length: 24 }, (_, i) => ({
            x: `${i.toString().padStart(2, '0')}:00`,
            y: Math.round(Math.random() * 1000)
        }))
    }];

    const options: ApexOptions = {
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [
                        { from: 0, to: 250, color: violet100 },
                        { from: 251, to: 500, color: violet300 },
                        { from: 501, to: 750, color: violet500 },
                        { from: 751, to: 1000, color: violet700 }
                    ]
                }
            }
        }
    };
</script>
