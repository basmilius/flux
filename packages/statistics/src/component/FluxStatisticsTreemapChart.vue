<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { computed } from 'vue';
    import { type EChartsOption, useChartBaseSetup } from '~flux/statistics/composable';
    import { buildTreemapChartOptions } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        nodes,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly nodes: readonly FluxStatisticsChartTreemapNode[];
        readonly tooltip?: boolean;
    }>();

    const { t } = useChartBaseSetup();

    const mergedOptions = computed(() => buildTreemapChartOptions({
        nodes,
        t,
        styles: $style,
        tooltip,
        advancedOptions
    }));
</script>
