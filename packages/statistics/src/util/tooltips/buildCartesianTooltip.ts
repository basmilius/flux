import type { FluxIconName } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { extractValue, renderTooltip } from './render';
import type { ChartTooltipValueFormatter, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface CartesianTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getSeriesIcons: () => readonly (FluxIconName | undefined)[];
    readonly valueFormatter?: ChartTooltipValueFormatter;
}

export function buildCartesianTooltip(input: CartesianTooltipInput): EChartsOption {
    const {t, styles, getSeriesIcons, valueFormatter} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const items = Array.isArray(params) ? params : [params];

        if (items.length === 0) {
            return '';
        }

        const rawTitle = items[0].axisValueLabel ?? items[0].axisValue ?? items[0].name ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';
        const icons = getSeriesIcons();

        return renderTooltip(t, styles, title, items.map(param => ({
            name: param.seriesName ?? '',
            value: extractValue(param.value),
            color: param.color,
            icon: icons[param.seriesIndex],
            seriesIndex: param.seriesIndex,
            dataIndex: param.dataIndex
        })), -1, valueFormatter);
    };

    return {
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: formatter as never
        }
    };
}
