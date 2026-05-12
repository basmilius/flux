<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'polarArea'
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.85
            },
            legend: {
                show: false
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 1,
                        strokeColor: 'var(--stroke)'
                    },
                    spokes: {
                        strokeWidth: 1,
                        connectorColors: 'var(--stroke)'
                    }
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'lighten',
                        value: 0.05
                    }
                }
            },
            stroke: {
                width: 2,
                colors: ['var(--surface)']
            },
            tooltip: {
                enabled: false
            },
            yaxis: {
                show: false
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
