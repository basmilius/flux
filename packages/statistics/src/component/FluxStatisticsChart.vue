<template>
    <Chart
        ref="chart"
        :options="options"/>
</template>

<script
    lang="ts"
    setup>
    import { computed, useTemplateRef } from 'vue';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { registerAllCharts } from '~flux/statistics/echarts';
    import { Chart } from './primitive';

    defineProps<{
        readonly options?: EChartsOption;
    }>();

    const chart = useTemplateRef('chart');
    const chartInstance = computed(() => chart.value?.chartInstance ?? null);

    registerAllCharts();

    defineExpose({chartInstance});
</script>
