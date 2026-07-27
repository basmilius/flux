import type { FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { toHeatmapSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildHeatmapTooltip } from '../../tooltips';
import { buildCartesianGrid } from '../buildCartesianBaseOptions';

export interface HeatmapChartOptionsInput {
    readonly series: readonly FluxStatisticsChartHeatmapSeries[];
    readonly xLabels: readonly string[];
    readonly yLabels: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly advancedOptions?: EChartsOption;
}

const HIDDEN = {show: false} as const;
const labelStyle = (show: boolean) => ({show, color: 'var(--chart-label)'});

export function buildHeatmapChartOptions(input: HeatmapChartOptionsInput): EChartsOption {
    const {
        series, xLabels, yLabels, t, styles,
        tooltip = false,
        xAxisLabels = false, yAxisLabels = false,
        advancedOptions = {}
    } = input;

    const translatedXLabels = xLabels.map(label => t(String(label)));
    const translatedYLabels = yLabels.map(label => t(String(label)));

    const base: EChartsOption = {
        grid: buildCartesianGrid(xAxisLabels, yAxisLabels, 12),
        color: ['var(--chart-ramp-3)'],
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {color: ['var(--chart-ramp-1)', 'var(--chart-ramp-2)', 'var(--chart-ramp-3)', 'var(--chart-ramp-4)']}
        },
        xAxis: {
            type: 'category',
            data: translatedXLabels as string[],
            axisLabel: labelStyle(xAxisLabels),
            axisLine: HIDDEN,
            axisTick: HIDDEN,
            splitLine: HIDDEN
        },
        yAxis: {
            type: 'category',
            data: translatedYLabels as string[],
            axisLabel: labelStyle(yAxisLabels),
            axisLine: HIDDEN,
            axisTick: HIDDEN,
            splitLine: HIDDEN
        }
    };

    const tooltipOptions: EChartsOption = tooltip
        ? buildHeatmapTooltip({t, styles, getSeries: () => series})
        : {tooltip: {show: false}};

    const echartsSeries = series.map(s =>
        toHeatmapSeries({...s, name: s.name ? t(String(s.name)) : undefined}, xLabels, yLabels)
    );

    return merge({}, base, tooltipOptions, advancedOptions, {series: echartsSeries});
}
