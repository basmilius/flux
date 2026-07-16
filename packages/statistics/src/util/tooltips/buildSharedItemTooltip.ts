import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { ChartTooltipValueFormatter, SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface SharedItemTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
    readonly getItems: () => readonly SharedTooltipItem[];
    readonly getTitle?: () => string | undefined;
    readonly valueFormatter?: ChartTooltipValueFormatter;
}

export function buildSharedItemTooltip(input: SharedItemTooltipInput): EChartsOption {
    const {t, styles, getItems, getTitle, valueFormatter} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const items = getItems();
        const activeIndex = param.dataIndex ?? -1;
        const rawTitle = getTitle?.() ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';

        return renderTooltip(t, styles, title, items, activeIndex, valueFormatter);
    };

    return {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: formatter as never
        }
    };
}
