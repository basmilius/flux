<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import { blue100, blue300, blue500, blue700 } from '@flux-ui/internals';
    import type { FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildHeatmapTooltipOptions, toHeatmapSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        series,
        tooltip = false,
        xLabels = [],
        yLabels = []
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartHeatmapSeries[];
        readonly tooltip?: boolean;
        readonly xLabels?: readonly string[];
        readonly yLabels?: readonly string[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const translatedXLabels = computed(() => xLabels.map(label => t(String(label))));
    const translatedYLabels = computed(() => yLabels.map(label => t(String(label))));

    const echartsSeries = computed(() => series.map(s =>
        toHeatmapSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, xLabels, yLabels)
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base: EChartsOption = {
            ...buildCartesianBaseOptions({ yAxisType: 'category' }),
            color: [blue500],
            grid: { left: 6, right: 6, top: 6, bottom: 24, containLabel: true },
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: { color: [blue100, blue300, blue500, blue700] }
            },
            xAxis: {
                type: 'category',
                data: translatedXLabels.value as string[],
                axisLabel: { show: true, color: 'var(--foreground-secondary)' },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            },
            yAxis: {
                type: 'category',
                data: translatedYLabels.value as string[],
                axisLabel: { show: true, color: 'var(--foreground-secondary)' },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        };

        const tooltipOptions: EChartsOption = tooltip
            ? buildHeatmapTooltipOptions(t, $style as never, () => series)
            : { tooltip: { show: false } };

        return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries.value });
    });
</script>
