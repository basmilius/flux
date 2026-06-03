import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { ChartLegendItem, EChartsOption } from '~flux/statistics/composable';
import { toGaugeSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildGaugeTooltip } from '../../tooltips';
import { buildCircularBaseOptions } from '../buildCircularBaseOptions';

export interface GaugeChartOptionsInput {
    readonly series: readonly FluxStatisticsChartGaugeSeries[];
    readonly palette: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly advancedOptions?: EChartsOption;
}

export function gaugeLegendItemBuilder(
    s: FluxStatisticsChartGaugeSeries,
    color: string,
    _index: number,
    t: Translator
): ChartLegendItem {
    return {
        color,
        icon: s.icon,
        label: s.name ? t(String(s.name)) : '',
        value: s.value
    };
}

export function buildGaugeChartOptions(input: GaugeChartOptionsInput): EChartsOption {
    const { series, palette, t, styles, tooltip = false, advancedOptions = {} } = input;

    const tooltipOptions: EChartsOption = tooltip
        ? buildGaugeTooltip({ t, styles, getSeries: () => series, getPalette: () => palette })
        : { tooltip: { show: false } };

    const echartsSeries = series.map((s, i) =>
        toGaugeSeries({ ...s, name: s.name ? t(String(s.name)) : s.name }, palette[i], i, series.length)
    );

    return merge({}, buildCircularBaseOptions(), tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
