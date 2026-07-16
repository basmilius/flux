import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { CHART_DEFAULT_COLORS, toTreemapSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildTreemapTooltip } from '../../tooltips';
import { buildCircularBaseOptions } from '../buildCircularBaseOptions';

export interface TreemapChartOptionsInput {
    readonly nodes: readonly FluxStatisticsChartTreemapNode[];
    readonly palette?: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly advancedOptions?: EChartsOption;
}

export function buildTreemapChartOptions(input: TreemapChartOptionsInput): EChartsOption {
    const {nodes, palette = CHART_DEFAULT_COLORS, t, styles, tooltip = false, advancedOptions = {}} = input;

    const tooltipOptions: EChartsOption = tooltip
        ? buildTreemapTooltip({t, styles})
        : {tooltip: {show: false}};

    const echartsSeries = [toTreemapSeries(nodes, palette)];

    return merge({}, buildCircularBaseOptions(), tooltipOptions, advancedOptions, {series: echartsSeries});
}
