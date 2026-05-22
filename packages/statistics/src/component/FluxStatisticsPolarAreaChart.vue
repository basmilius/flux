<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useChartSlicesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildPolarAreaChartOptions, type ChartTooltipValueFormatter } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        slices,
        title,
        tooltip = false,
        tooltipValueFormatter
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly slices: readonly FluxStatisticsChartPieSlice[];
        readonly title?: string;
        readonly tooltip?: boolean;
        readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
    }>();

    const { t, palette, tooltipItems } = useChartSlicesSetup(() => slices);

    const mergedOptions = computed(() => buildPolarAreaChartOptions({
        slices,
        palette: palette.value,
        tooltipItems: tooltipItems.value,
        title,
        t,
        styles: $style,
        tooltip,
        tooltipValueFormatter,
        advancedOptions
    }));
</script>
