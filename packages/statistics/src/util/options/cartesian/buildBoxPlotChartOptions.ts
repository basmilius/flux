import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { toBoxPlotSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildBoxPlotTooltip } from '../../tooltips';
import { buildCartesianBaseOptions } from '../buildCartesianBaseOptions';

export interface BoxPlotChartOptionsInput {
    readonly series: readonly FluxStatisticsChartBoxPlotSeries[];
    readonly labels?: readonly string[];
    readonly palette: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
    readonly advancedOptions?: EChartsOption;
}

function resolveBoxPlotLabels(
    series: readonly FluxStatisticsChartBoxPlotSeries[],
    labels?: readonly string[]
): readonly string[] | undefined {
    if (labels) {
        return labels;
    }

    for (const s of series) {
        const fromPoints = s.data.map(p => p.label ?? '').filter(Boolean);
        if (fromPoints.length > 0) {
            return s.data.map(p => p.label ?? '');
        }
    }

    return undefined;
}

export function buildBoxPlotChartOptions(input: BoxPlotChartOptionsInput): EChartsOption {
    const {
        series, labels, palette, t, styles,
        tooltip = false,
        xAxisLabels = false, yAxisLabels = false, splitLines = false,
        advancedOptions = {}
    } = input;

    const xLabels = resolveBoxPlotLabels(series, labels);
    const base = buildCartesianBaseOptions({ xAxisLabels, yAxisLabels, splitLines });
    const xAxisOverride: EChartsOption | undefined = xLabels
        ? { xAxis: { type: 'category', data: xLabels as string[] } }
        : undefined;

    const tooltipOptions: EChartsOption = tooltip
        ? buildBoxPlotTooltip({ t, styles, getSeries: () => series, getPalette: () => palette })
        : { tooltip: { show: false } };

    const echartsSeries = series.map((s, i) =>
        toBoxPlotSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette[i])
    );

    return merge({}, base, xAxisOverride ?? {}, tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
