import { formatNumber } from '@basmilius/utils';
import { renderIconSvg } from '../icons';
import type { ChartTooltipValueFormatter, SharedTooltipItem, TooltipParam, TooltipStyleClasses, Translator } from './types';

export function renderTooltip(
    t: Translator,
    styles: TooltipStyleClasses,
    title: string,
    items: readonly SharedTooltipItem[],
    activeIndex: number = -1,
    valueFormatter?: ChartTooltipValueFormatter
): string {
    if (items.length === 0) {
        return '';
    }

    const titleHtml = title
        ? `<div class="${styles.statisticsChartTooltipTitle}">${title}</div>`
        : '';

    const hasActive = activeIndex !== -1;

    const body = items.map((item, idx) => {
        const isActive = !hasActive || idx === activeIndex;
        const activeClass = isActive ? ` ${styles.isActive}` : '';
        const translatedName = item.name ? t(String(item.name)) : '';

        const marker = item.icon
            ? `<div class="${styles.statisticsChartTooltipSeriesIcon}${activeClass}" style="color: ${item.color}">${renderIconSvg(item.icon, item.color, 14)}</div>`
            : `<div class="${styles.statisticsChartTooltipSeriesColor}${activeClass}" style="background: ${item.color}"></div>`;

        const display = valueFormatter ? valueFormatter(item.value, item) : formatValue(item.value);

        return `
            ${marker}
            <div class="${styles.statisticsChartTooltipSeriesName}${activeClass}">${translatedName}</div>
            <div class="${styles.statisticsChartTooltipSeriesValue}${activeClass}">${display}</div>
        `;
    }).join('');

    return `<div class="${styles.statisticsChartTooltip}">${titleHtml}<div class="${styles.statisticsChartTooltipBody}">${body}</div></div>`;
}

export function extractValue(value: TooltipParam['value']): number | string {
    if (Array.isArray(value)) {
        const last = value[value.length - 1];
        return typeof last === 'number' || typeof last === 'string' ? last : '';
    }

    return value ?? '';
}

export function formatValue(value: TooltipParam['value']): string {
    if (Array.isArray(value)) {
        const last = value[value.length - 1];
        return formatValue(last);
    }

    if (typeof value === 'number') {
        return Number.isInteger(value)
            ? formatNumber(value)
            : value.toString();
    }

    return String(value ?? '');
}
