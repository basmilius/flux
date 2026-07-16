import type { FluxIconName, FluxStatisticsChartColor } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { resolveChartColor } from '../series';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface CandlestickTooltipPoint {
    readonly label?: string;
    readonly open: number;
    readonly close: number;
    readonly low: number;
    readonly high: number;
}

export interface CandlestickTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeries: () => readonly { readonly name?: string; readonly icon?: FluxIconName; readonly positiveColor?: FluxStatisticsChartColor; readonly negativeColor?: FluxStatisticsChartColor; readonly data: readonly CandlestickTooltipPoint[] }[];
}

export function buildCandlestickTooltip(input: CandlestickTooltipInput): EChartsOption {
    const {t, styles, getSeries} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const series = getSeries();
        const seriesIndex = param.seriesIndex ?? 0;
        const dataIndex = param.dataIndex ?? 0;
        const s = series[seriesIndex];
        const point = s?.data[dataIndex];

        if (!s || !point) {
            return '';
        }

        const positive = resolveChartColor(s.positiveColor) ?? 'var(--success-500)';
        const negative = resolveChartColor(s.negativeColor) ?? 'var(--danger-500)';
        const color = point.close >= point.open ? positive : negative;
        const seriesName = s.name ? t(String(s.name)) : '';
        const pointLabel = point.label ? t(String(point.label)) : '';
        const title = [seriesName, pointLabel].filter(Boolean).join(' — ');

        const items: SharedTooltipItem[] = [
            {name: 'Open', value: point.open, color},
            {name: 'Close', value: point.close, color},
            {name: 'Lowest', value: point.low, color},
            {name: 'Highest', value: point.high, color}
        ];

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
