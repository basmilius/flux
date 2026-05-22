import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { cartesianFallbackLabels, extractLabels, toMixedSeries } from '../../series';
import type { ChartTooltipValueFormatter, TooltipStyleClasses, Translator } from '../../tooltips';
import { buildCartesianTooltip } from '../../tooltips';
import { buildCartesianBaseOptions } from '../buildCartesianBaseOptions';

export interface MixedChartOptionsInput {
    readonly series: readonly FluxStatisticsChartMixedSeries[];
    readonly labels?: readonly string[];
    readonly palette: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
    readonly advancedOptions?: EChartsOption;
}

export function buildMixedChartOptions(input: MixedChartOptionsInput): EChartsOption {
    const {
        series, labels, palette, t, styles,
        tooltip = false, tooltipValueFormatter,
        xAxisLabels = false, yAxisLabels = false, splitLines = false,
        advancedOptions = {}
    } = input;

    const xLabels = labels ?? extractLabels(series) ?? cartesianFallbackLabels(series);
    const base = buildCartesianBaseOptions({ tooltipTrigger: 'axis', xAxisLabels, yAxisLabels, splitLines });
    const xAxisOverride: EChartsOption = { xAxis: { type: 'category', data: xLabels as string[] } };

    const tooltipOptions: EChartsOption = tooltip
        ? buildCartesianTooltip({ t, styles, getSeriesIcons: () => series.map(s => s.icon), valueFormatter: tooltipValueFormatter })
        : { tooltip: { show: false } };

    const echartsSeries = series.map((s, i) =>
        toMixedSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette[i])
    );

    return merge({}, base, xAxisOverride, tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
