import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { ChartLegendItem } from '~flux/statistics/composable/useChartLegend';
import type { EChartsOption } from '~flux/statistics/composable/useECharts';
import { resolveChartColor, toCandlestickSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildCartesianTooltip } from '../../tooltips';
import { buildCartesianBaseOptions } from '../buildCartesianBaseOptions';

export interface CandlestickChartOptionsInput {
    readonly series: readonly FluxStatisticsChartCandlestickSeries[];
    readonly labels?: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
    readonly advancedOptions?: EChartsOption;
}

function resolveCandlestickLabels(
    series: readonly FluxStatisticsChartCandlestickSeries[],
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

export function candlestickLegendItemBuilder(s: FluxStatisticsChartCandlestickSeries): readonly ChartLegendItem[] {
    return [
        {
            color: resolveChartColor(s.positiveColor) ?? 'var(--success-500)',
            icon: s.icon,
            label: 'Up'
        },
        {
            color: resolveChartColor(s.negativeColor) ?? 'var(--danger-500)',
            label: 'Down'
        }
    ];
}

export function buildCandlestickChartOptions(input: CandlestickChartOptionsInput): EChartsOption {
    const {
        series, labels, t, styles,
        tooltip = false,
        xAxisLabels = false, yAxisLabels = false, splitLines = false,
        advancedOptions = {}
    } = input;

    const xLabels = resolveCandlestickLabels(series, labels);
    const base = buildCartesianBaseOptions({ scale: true, xAxisLabels, yAxisLabels, splitLines, minPadding: 12 });
    const xAxisOverride: EChartsOption | undefined = xLabels
        ? { xAxis: { type: 'category', data: xLabels as string[] } }
        : undefined;

    const tooltipOptions: EChartsOption = tooltip
        ? buildCartesianTooltip({ t, styles, getSeriesIcons: () => series.map(s => s.icon) })
        : { tooltip: { show: false } };

    const echartsSeries = series.map(s =>
        toCandlestickSeries({ ...s, name: s.name ? t(String(s.name)) : undefined })
    );

    return merge({}, base, xAxisOverride ?? {}, tooltipOptions, advancedOptions, { series: echartsSeries });
}
