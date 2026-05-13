<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, resolveChartColor, type SharedTooltipItem, toRadarSeries, type TooltipParam, type TooltipStyleClasses } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        indicators,
        series
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly indicators: readonly FluxStatisticsChartRadarIndicator[];
        readonly series: readonly FluxStatisticsChartRadarSeries[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const palette = computed<readonly string[]>(() =>
        series.map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const echartsSeries = computed(() => [toRadarSeries(
        series.map(s => ({ ...s, name: s.name ? t(String(s.name)) : undefined })),
        palette.value
    )]);

    const radarConfig = computed(() => ({
        radar: {
            indicator: indicators.map(i => ({ name: t(String(i.name)), max: i.max })),
            splitLine: { lineStyle: { color: 'var(--gray-200)' } },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'var(--gray-200)' } },
            axisName: {
                color: 'var(--foreground-secondary)',
                fontSize: 12,
                fontWeight: 500
            }
        }
    } as EChartsOption));

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        series.map((s, i) => ({
            color: palette.value[i],
            icon: s.icon,
            label: s.name ? t(String(s.name)) : ''
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const tooltipFormatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const ringIndex = param.dataIndex ?? 0;
        const ring = series[ringIndex];

        if (!ring) {
            return '';
        }

        const styles = $style as unknown as TooltipStyleClasses;
        const color = palette.value[ringIndex % palette.value.length];
        const title = ring.name ? t(String(ring.name)) : '';

        const tooltipItems: SharedTooltipItem[] = indicators.map((indicator, idx) => ({
            name: indicator.name,
            value: ring.values[idx] ?? '',
            color
        }));

        const titleHtml = title
            ? `<div class="${styles.statisticsChartTooltipTitle}">${title}</div>`
            : '';

        const body = tooltipItems.map(item => {
            const translatedName = item.name ? t(String(item.name)) : '';
            return `
                <div class="${styles.statisticsChartTooltipSeriesColor} ${styles.isActive}" style="background: ${item.color}"></div>
                <div class="${styles.statisticsChartTooltipSeriesName} ${styles.isActive}">${translatedName}</div>
                <div class="${styles.statisticsChartTooltipSeriesValue} ${styles.isActive}">${item.value}</div>
            `;
        }).join('');

        return `${titleHtml}<div class="${styles.statisticsChartTooltipBody}">${body}</div>`;
    };

    const tooltipOptions: EChartsOption = {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: tooltipFormatter as never
        }
    };

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, radarConfig.value, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value })
    );
</script>
