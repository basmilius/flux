<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { usePieSlicesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildSharedItemTooltipFormatter, type ChartTooltipValueFormatter, POLAR_BASE_OPTIONS, toDonutSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
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

    const { t, palette, tooltipItems } = usePieSlicesSetup(() => slices);

    const echartsSeries = computed(() => [toDonutSeries(slices, palette.value)]);

    const tooltipOptions = computed<EChartsOption>(() => {
        if (!tooltip) {
            return { tooltip: { show: false } };
        }

        return {
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: buildSharedItemTooltipFormatter(t, $style as never, () => tooltipItems.value, () => title, tooltipValueFormatter) as never
            }
        };
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, tooltipOptions.value, advancedOptions, { series: echartsSeries.value, color: palette.value })
    );
</script>
