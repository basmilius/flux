import type { FluxIconName } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface BoxPlotTooltipPoint {
    readonly label?: string;
    readonly min: number;
    readonly q1: number;
    readonly median: number;
    readonly q3: number;
    readonly max: number;
}

export interface BoxPlotTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeries: () => readonly { readonly name?: string; readonly icon?: FluxIconName; readonly data: readonly BoxPlotTooltipPoint[] }[];
    readonly getPalette: () => readonly string[];
}

export function buildBoxPlotTooltip(input: BoxPlotTooltipInput): EChartsOption {
    const {t, styles, getSeries, getPalette} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const series = getSeries();
        const palette = getPalette();
        const seriesIndex = param.seriesIndex ?? 0;
        const dataIndex = param.dataIndex ?? 0;
        const s = series[seriesIndex];
        const point = s?.data[dataIndex];

        if (!s || !point) {
            return '';
        }

        const color = palette[seriesIndex % palette.length];
        const seriesName = s.name ? t(String(s.name)) : '';
        const pointLabel = point.label ? t(String(point.label)) : '';
        const title = [seriesName, pointLabel].filter(Boolean).join(' — ');

        const items: SharedTooltipItem[] = [
            {name: 'Min', value: point.min, color},
            {name: 'Q1', value: point.q1, color},
            {name: 'Median', value: point.median, color},
            {name: 'Q3', value: point.q3, color},
            {name: 'Max', value: point.max, color}
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
