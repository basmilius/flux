<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'treemap'
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    colors: ['var(--white)']
                },
                offsetY: -2
            },
            grid: {
                show: false
            },
            legend: {
                show: false
            },
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: true,
                    shadeIntensity: 0.3,
                    borderRadius: 6,
                    useFillColorAsStroke: false
                }
            },
            stroke: {
                width: 3,
                colors: ['var(--surface)']
            },
            tooltip: {
                enabled: false
            }
        }, options)"
        :series="series"/>
</template>

<script
    lang="ts"
    setup>
    import type { ApexOptions } from 'apexcharts';
    import { merge } from 'lodash-es';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {}
    } = defineProps<{
        readonly aspectRatio?: number;
        readonly options?: ApexOptions;
        readonly series: ApexOptions['series'];
    }>();
</script>
