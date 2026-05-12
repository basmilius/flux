<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'radialBar'
            },
            grid: {
                show: false
            },
            legend: {
                show: false
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    hollow: {
                        size: '62%',
                        background: 'transparent'
                    },
                    track: {
                        background: 'var(--gray-100)',
                        strokeWidth: '100%',
                        margin: 6,
                        opacity: 1
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            color: 'var(--foreground-secondary)',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: 'inherit',
                            offsetY: -8
                        },
                        value: {
                            show: true,
                            color: 'var(--foreground-prominent)',
                            fontSize: '28px',
                            fontWeight: 800,
                            fontFamily: 'inherit',
                            offsetY: 6,
                            formatter: (val) => `${val}%`
                        }
                    }
                }
            },
            stroke: {
                lineCap: 'round'
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
