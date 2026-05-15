import { formatNumber } from '@basmilius/utils';
import type { FluxIconName } from '@flux-ui/types';
import type { EChartsOption } from '~flux/statistics/composable';
import { renderIconSvg } from './iconSvg';

export interface TooltipParam {
    readonly seriesName?: string;
    readonly seriesIndex: number;
    readonly color: string;
    readonly value: number | string | (number | string)[];
    readonly name: string;
    readonly dataIndex?: number;
    readonly axisValue?: string;
    readonly axisValueLabel?: string;
    readonly data?: unknown;
    readonly marker?: string;
}

export type TooltipStyleClasses = {
    readonly statisticsChartTooltipTitle: string;
    readonly statisticsChartTooltipBody: string;
    readonly statisticsChartTooltipSection: string;
    readonly statisticsChartTooltipSectionTitle: string;
    readonly statisticsChartTooltipSectionBody: string;
    readonly statisticsChartTooltipSeriesColor: string;
    readonly statisticsChartTooltipSeriesIcon: string;
    readonly statisticsChartTooltipSeriesName: string;
    readonly statisticsChartTooltipSeriesValue: string;
    readonly isActive: string;
    readonly isDimmed: string;
};

export type Translator = (key: string) => string;

export interface SharedTooltipItem {
    readonly name: string;
    readonly value: number | string;
    readonly color: string;
    readonly icon?: FluxIconName;
    readonly seriesIndex?: number;
    readonly dataIndex?: number;
}

export type ChartTooltipValueFormatter = (value: number | string, item: SharedTooltipItem) => string;

export const CHART_DEFAULT_COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)'
] as const;

export function buildTooltipFormatter(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeriesIcons?: () => readonly (FluxIconName | undefined)[],
    valueFormatter?: ChartTooltipValueFormatter
) {
    return (params: TooltipParam | TooltipParam[]): string => {
        const items = Array.isArray(params) ? params : [params];

        if (items.length === 0) {
            return '';
        }

        const rawTitle = items[0].axisValueLabel ?? items[0].axisValue ?? items[0].name ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';
        const icons = getSeriesIcons?.();

        return renderTooltip(t, styles, title, items.map(param => ({
            name: param.seriesName ?? '',
            value: extractValue(param.value),
            color: param.color,
            icon: icons?.[param.seriesIndex],
            seriesIndex: param.seriesIndex,
            dataIndex: param.dataIndex
        })), -1, valueFormatter);
    };
}

export function buildCartesianTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeriesIcons: () => readonly (FluxIconName | undefined)[],
    valueFormatter?: ChartTooltipValueFormatter
): EChartsOption {
    return {
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: buildTooltipFormatter(t, styles, getSeriesIcons, valueFormatter) as never
        }
    };
}

export function buildSharedItemTooltipFormatter(
    t: Translator,
    styles: TooltipStyleClasses,
    getItems: () => readonly SharedTooltipItem[],
    getTitle?: () => string | undefined,
    valueFormatter?: ChartTooltipValueFormatter
) {
    return (params: TooltipParam | TooltipParam[]): string => {
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
}

function renderTooltip(
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

    return `${titleHtml}<div class="${styles.statisticsChartTooltipBody}">${body}</div>`;
}

function extractValue(value: TooltipParam['value']): number | string {
    if (Array.isArray(value)) {
        const last = value[value.length - 1];
        return typeof last === 'number' || typeof last === 'string' ? last : '';
    }

    return value ?? '';
}

function formatValue(value: TooltipParam['value']): string {
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

export interface BoxPlotTooltipPoint {
    readonly label?: string;
    readonly min: number;
    readonly q1: number;
    readonly median: number;
    readonly q3: number;
    readonly max: number;
}

export function buildBoxPlotTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeries: () => readonly { readonly name?: string; readonly icon?: FluxIconName; readonly data: readonly BoxPlotTooltipPoint[] }[],
    getPalette: () => readonly string[]
): EChartsOption {
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
            { name: 'Min', value: point.min, color },
            { name: 'Q1', value: point.q1, color },
            { name: 'Median', value: point.median, color },
            { name: 'Q3', value: point.q3, color },
            { name: 'Max', value: point.max, color }
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

export interface HeatmapTooltipPoint {
    readonly x: string | number;
    readonly y: string | number;
    readonly value: number;
    readonly formatted?: string;
}

export function buildHeatmapTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeries: () => readonly { readonly name?: string; readonly data: readonly HeatmapTooltipPoint[] }[]
): EChartsOption {
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
            { name: '', value: point.formatted ?? point.value, color: 'var(--primary-600)' }
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

export interface TreemapTooltipNode {
    readonly name: string;
    readonly value?: number;
    readonly color?: string;
}

export function buildTreemapTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses
): EChartsOption {
    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const data = param.data as TreemapTooltipNode | undefined;

        if (!data) {
            return '';
        }

        const color = data.color ?? 'var(--primary-600)';
        const title = data.name ? t(String(data.name)) : '';

        const items: SharedTooltipItem[] = [
            { name: '', value: data.value ?? '', color }
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

export function buildGaugeTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeries: () => readonly { readonly name?: string; readonly value: number; readonly icon?: FluxIconName }[],
    getPalette: () => readonly string[]
): EChartsOption {
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
            { name: '', value: s.value, color, icon: s.icon }
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

export function buildDefaultOptions(): EChartsOption {
    return {
        color: [
            'var(--chart-1)',
            'var(--chart-2)',
            'var(--chart-3)',
            'var(--chart-4)'
        ],
        animation: true,
        animationDuration: 1000,
        animationDurationUpdate: 400,
        animationEasing: 'cubicOut',
        animationEasingUpdate: 'cubicInOut',
        tooltip: {
            show: false,
            backgroundColor: 'transparent',
            borderWidth: 0,
            padding: 0,
            extraCssText: 'box-shadow: none;',
            className: 'flux-statistics-tooltip'
        },
        legend: {
            show: false
        }
    };
}
