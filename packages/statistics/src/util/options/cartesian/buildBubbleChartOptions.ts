import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { toBubbleSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildCartesianTooltip } from '../../tooltips';
import { buildCartesianBaseOptions } from '../buildCartesianBaseOptions';

export interface BubbleChartOptionsInput {
    readonly series: readonly FluxStatisticsChartBubbleSeries[];
    readonly palette: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
    readonly advancedOptions?: EChartsOption;
}

export function buildBubbleChartOptions(input: BubbleChartOptionsInput): EChartsOption {
    const {
        series, palette, t, styles,
        tooltip = false,
        xAxisLabels = false, yAxisLabels = false, splitLines = false,
        advancedOptions = {}
    } = input;

    const base = buildCartesianBaseOptions({
        xAxisType: 'value',
        yAxisType: 'value',
        scale: true,
        xAxisLabels,
        yAxisLabels,
        splitLines,
        minPadding: 12
    });

    const tooltipOptions: EChartsOption = tooltip
        ? buildCartesianTooltip({ t, styles, getSeriesIcons: () => series.map(s => s.icon) })
        : { tooltip: { show: false } };

    const echartsSeries = series.map((s, i) =>
        toBubbleSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette[i])
    );

    return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
