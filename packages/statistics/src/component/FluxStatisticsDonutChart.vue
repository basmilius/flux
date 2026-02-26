<template>
    <Chart
        :aspectRatio="aspectRatio"
        :options="merge({
            chart: {
                type: 'donut'
            },
            legend: {
                show: false
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
