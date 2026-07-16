import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface HeatmapTooltipPoint {
    readonly x: string | number;
    readonly y: string | number;
    readonly value: number;
    readonly formatted?: string;
}

export interface HeatmapTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeries: () => readonly { readonly name?: string; readonly data: readonly HeatmapTooltipPoint[] }[];
}

export function buildHeatmapTooltip(input: HeatmapTooltipInput): EChartsOption {
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

        const seriesName = s.name ? t(String(s.name)) : '';
        const xLabel = t(String(point.x));
        const yLabel = t(String(point.y));
        const title = [seriesName, `${xLabel} · ${yLabel}`].filter(Boolean).join(' — ');

        const items: SharedTooltipItem[] = [
            {name: '', value: point.formatted ?? point.value, color: 'var(--primary-600)'}
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
