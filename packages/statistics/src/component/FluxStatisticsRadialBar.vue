<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildGaugeTooltipOptions, POLAR_BASE_OPTIONS, toGaugeSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartGaugeSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series, {
        getLegendItem: (s, color, _, translate) => ({
            color,
            icon: s.icon,
            label: s.name ? translate(String(s.name)) : '',
            value: s.value
        })
    });

    const echartsSeries = computed(() => series.map((s, i) =>
        toGaugeSeries({ ...s, name: s.name ? t(String(s.name)) : s.name }, palette.value[i], i, series.length)
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const tooltipOptions: EChartsOption = tooltip
            ? buildGaugeTooltipOptions(t, $style as never, () => series, () => palette.value)
            : { tooltip: { show: false } };

        return merge({}, POLAR_BASE_OPTIONS, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
