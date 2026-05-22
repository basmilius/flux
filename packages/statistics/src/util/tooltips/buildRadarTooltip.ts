import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface RadarTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeries: () => readonly FluxStatisticsChartRadarSeries[];
    readonly getIndicators: () => readonly FluxStatisticsChartRadarIndicator[];
    readonly getPalette: () => readonly string[];
}

export function buildRadarTooltip(input: RadarTooltipInput): EChartsOption {
    const { t, styles, getSeries, getIndicators, getPalette } = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const series = getSeries();
        const indicators = getIndicators();
        const palette = getPalette();
        const ringIndex = param.dataIndex ?? 0;
        const ring = series[ringIndex];

        if (!ring) {
            return '';
        }

        const color = palette[ringIndex % palette.length];
        const title = ring.name ? t(String(ring.name)) : '';

        const items: SharedTooltipItem[] = indicators.map((indicator, idx) => ({
            name: indicator.name,
            value: ring.values[idx] ?? '',
            color
        }));

        return renderTooltip(t, styles, title, items);
    };

    return {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: formatter as never
        }
    };
}
