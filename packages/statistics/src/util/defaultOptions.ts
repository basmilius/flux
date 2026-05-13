import { formatNumber } from '@basmilius/utils';
import type { PieSeriesOption, RadarSeriesOption } from 'echarts/charts';
import type { EChartsOption } from '~flux/statistics/composable';

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
}

export const CHART_DEFAULT_COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)'
] as const;

export function buildTooltipFormatter(t: Translator, styles: TooltipStyleClasses) {
    return (params: TooltipParam | TooltipParam[]): string => {
        const items = Array.isArray(params) ? params : [params];

        if (items.length === 0) {
            return '';
        }

        const rawTitle = items[0].axisValueLabel ?? items[0].axisValue ?? items[0].name ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';

        return renderTooltip(t, styles, title, items.map(param => ({
            name: param.seriesName ?? '',
            value: extractValue(param.value),
            color: param.color
        })));
    };
}

export function buildSharedItemTooltipFormatter(
    t: Translator,
    styles: TooltipStyleClasses,
    getItems: () => readonly SharedTooltipItem[],
    getTitle?: () => string
) {
    return (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const items = getItems();
        const activeIndex = param.dataIndex ?? -1;
        const rawTitle = getTitle?.() ?? param.seriesName ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';

        return renderTooltip(t, styles, title, items, activeIndex);
    };
}

function renderTooltip(
    t: Translator,
    styles: TooltipStyleClasses,
    title: string,
    items: readonly SharedTooltipItem[],
    activeIndex: number = -1
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

        return `
            <div class="${styles.statisticsChartTooltipSeriesColor}${activeClass}" style="background: ${item.color}"></div>
            <div class="${styles.statisticsChartTooltipSeriesName}${activeClass}">${translatedName}</div>
            <div class="${styles.statisticsChartTooltipSeriesValue}${activeClass}">${formatValue(item.value)}</div>
        `;
    }).join('');

    return `${titleHtml}<div class="${styles.statisticsChartTooltipBody}">${body}</div>`;
}

export function buildSharedPieTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getSeries: () => readonly PieSeriesOption[],
    getPalette?: () => readonly string[]
): EChartsOption {
    const formatter = buildSharedItemTooltipFormatter(
        t,
        styles,
        () => extractPieItems(getSeries(), getPalette?.() ?? CHART_DEFAULT_COLORS)
    );

    return {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: formatter as never
        }
    };
}

export interface RadarIndicator {
    readonly name?: string;
}

export function buildSharedRadarTooltipOptions(
    t: Translator,
    styles: TooltipStyleClasses,
    getIndicators: () => readonly RadarIndicator[],
    getSeries: () => readonly RadarSeriesOption[],
    getPalette: () => readonly string[]
): EChartsOption {
    const formatter = (params: TooltipParam | TooltipParam[]): string => {
        const param = Array.isArray(params) ? params[0] : params;

        if (!param) {
            return '';
        }

        const series = getSeries();
        const data = series[0]?.data as readonly { value?: readonly number[]; name?: string }[] | undefined;

        if (!data || data.length === 0) {
            return '';
        }

        const ringIndex = param.dataIndex ?? 0;
        const ring = data[ringIndex];

        if (!ring) {
            return '';
        }

        const indicators = getIndicators();
        const palette = getPalette();
        const color = palette[ringIndex % palette.length];
        const title = ring.name ? t(String(ring.name)) : '';

        const items: SharedTooltipItem[] = indicators.map((indicator, idx) => ({
            name: indicator.name ?? '',
            value: ring.value?.[idx] ?? '',
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

function extractPieItems(series: readonly PieSeriesOption[], palette: readonly string[]): readonly SharedTooltipItem[] {
    const first = series[0];

    if (!first?.data) {
        return [];
    }

    return (first.data as readonly unknown[]).map((item, idx) => {
        const color = palette[idx % palette.length];

        if (typeof item === 'number') {
            return { name: '', value: item, color };
        }

        if (typeof item === 'object' && item !== null) {
            const entry = item as { name?: string; value?: number | string; itemStyle?: { color?: string } };
            return {
                name: entry.name ?? '',
                value: entry.value ?? '',
                color: entry.itemStyle?.color ?? color
            };
        }

        return { name: '', value: '', color };
    });
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

export interface DefaultOptionsConfig {
    readonly tooltipFormatter: ReturnType<typeof buildTooltipFormatter>;
}

export function buildDefaultOptions({ tooltipFormatter }: DefaultOptionsConfig): EChartsOption {
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
            show: true,
            trigger: 'axis',
            formatter: tooltipFormatter as never,
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
