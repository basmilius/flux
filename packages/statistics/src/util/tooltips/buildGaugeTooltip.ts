import type { FluxIconName } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface GaugeTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeries: () => readonly { readonly name?: string; readonly value: number; readonly icon?: FluxIconName }[];
    readonly getPalette: () => readonly string[];
}

export function buildGaugeTooltip(input: GaugeTooltipInput): EChartsOption {
    const {t, styles, getSeries, getPalette} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const series = getSeries();
        const palette = getPalette();
        const seriesIndex = param.seriesIndex ?? 0;
        const s = series[seriesIndex];

        if (!s) {
            return '';
        }

        const color = palette[seriesIndex % palette.length];
        const title = s.name ? t(String(s.name)) : '';

        const items: SharedTooltipItem[] = [
            {name: '', value: s.value, color, icon: s.icon}
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
