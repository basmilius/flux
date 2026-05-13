import { formatNumber } from '@basmilius/utils';
import type { EChartsOption } from '~flux/statistics/composable';

export interface TooltipParam {
    readonly seriesName?: string;
    readonly seriesIndex: number;
    readonly color: string;
    readonly value: number | string | (number | string)[];
    readonly name: string;
    readonly axisValue?: string;
    readonly axisValueLabel?: string;
    readonly data?: unknown;
    readonly marker?: string;
}

export type TooltipStyleClasses = {
    readonly statisticsChartTooltipTitle: string;
    readonly statisticsChartTooltipBody: string;
    readonly statisticsChartTooltipSeriesColor: string;
    readonly statisticsChartTooltipSeriesName: string;
    readonly statisticsChartTooltipSeriesValue: string;
};

export type Translator = (key: string) => string;

export function buildTooltipFormatter(t: Translator, styles: TooltipStyleClasses) {
    return (params: TooltipParam | TooltipParam[]): string => {
        const items = Array.isArray(params) ? params : [params];

        if (items.length === 0) {
            return '';
        }

        const rawTitle = items[0].axisValueLabel ?? items[0].axisValue ?? items[0].name ?? '';
        const title = rawTitle ? t(String(rawTitle)) : '';

        const titleHtml = title
            ? `<div class="${styles.statisticsChartTooltipTitle}">${title}</div>`
            : '';

        const body = items.map(param => {
            const seriesName = param.seriesName ?? '';
            const translatedName = seriesName ? t(String(seriesName)) : '';

            return `
                <div class="${styles.statisticsChartTooltipSeriesColor}" style="background: ${param.color}"></div>
                <div class="${styles.statisticsChartTooltipSeriesName}">${translatedName}</div>
                <div class="${styles.statisticsChartTooltipSeriesValue}">${formatValue(param.value)}</div>
            `;
        }).join('');

        return `${titleHtml}<div class="${styles.statisticsChartTooltipBody}">${body}</div>`;
    };
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
        grid: {
            show: false,
            borderWidth: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: false,
            outerBoundsMode: 'none'
        },
        xAxis: {
            type: 'category',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
        },
        yAxis: {
            type: 'value',
            show: false
        },
        legend: {
            show: false
        }
    };
}
