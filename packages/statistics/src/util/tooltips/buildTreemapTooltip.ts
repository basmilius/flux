import type { EChartsOption } from '~flux/statistics/composable';
import { renderTooltip } from './render';
import type { SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export interface TreemapTooltipNode {
    readonly name: string;
    readonly value?: number;
    readonly itemStyle?: {
        readonly color?: string;
    };
}

export interface TreemapTooltipInput {
    readonly t: Translator;
    readonly styles: TooltipStyleClasses;
}

export function buildTreemapTooltip(input: TreemapTooltipInput): EChartsOption {
    const {t, styles} = input;

    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const data = param.data as TreemapTooltipNode | undefined;

        if (!data) {
            return '';
        }

        const color = data.itemStyle?.color ?? param.color ?? 'var(--primary-600)';
        const title = data.name ? t(String(data.name)) : '';

        const items: SharedTooltipItem[] = [
            {name: '', value: data.value ?? '', color}
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
