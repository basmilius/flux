import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
import { merge } from 'lodash-es';
import type { EChartsOption } from '~flux/statistics/composable';
import { toRadarSeries } from '../../series';
import type { TooltipStyleClasses, Translator } from '../../tooltips';
import { buildRadarTooltip } from '../../tooltips';
import { buildCircularBaseOptions } from '../buildCircularBaseOptions';

export interface RadarChartOptionsInput {
    readonly series: readonly FluxStatisticsChartRadarSeries[];
    readonly indicators: readonly FluxStatisticsChartRadarIndicator[];
    readonly palette: readonly string[];
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly tooltip?: boolean;
    readonly advancedOptions?: EChartsOption;
}

export function buildRadarChartOptions(input: RadarChartOptionsInput): EChartsOption {
    const { series, indicators, palette, t, styles, tooltip = false, advancedOptions = {} } = input;

    const radarConfig: EChartsOption = {
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
    };

    const tooltipOptions: EChartsOption = tooltip
        ? buildRadarTooltip({
            t,
            styles,
            getSeries: () => series,
            getIndicators: () => indicators,
            getPalette: () => palette
        })
        : { tooltip: { show: false } };

    const echartsSeries = [toRadarSeries(
        series.map(s => ({ ...s, name: s.name ? t(String(s.name)) : undefined })),
        palette
    )];

    return merge({}, buildCircularBaseOptions(), radarConfig, tooltipOptions, advancedOptions, { series: echartsSeries, color: palette });
}
