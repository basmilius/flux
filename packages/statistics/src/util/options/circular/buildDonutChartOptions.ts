import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { toDonutSeries } from '../../series';
import type { ChartTooltipValueFormatter, SharedTooltipItem, TooltipStyleClasses, Translator } from '../../tooltips';
import { buildSharedItemTooltip } from '../../tooltips';
import { buildCircularBaseOptions } from '../buildCircularBaseOptions';

export interface DonutChartOptionsInput {
    readonly slices: readonly FluxStatisticsChartPieSlice[];
    readonly palette: readonly string[];
    readonly tooltipItems: readonly SharedTooltipItem[];
    readonly title?: string;
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
    readonly advancedOptions?: EChartsOption;
}

export function buildDonutChartOptions(input: DonutChartOptionsInput): EChartsOption {
    const { slices, palette, tooltipItems, title, t, styles, tooltip = false, tooltipValueFormatter, advancedOptions = {} } = input;

    const tooltipOptions: EChartsOption = tooltip
        ? buildSharedItemTooltip({ t, styles, getItems: () => tooltipItems, getTitle: () => title, valueFormatter: tooltipValueFormatter })
        : { tooltip: { show: false } };

    const echartsSeries = [toDonutSeries(slices, palette)];

    return merge({}, buildCircularBaseOptions(), tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
