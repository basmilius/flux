import type { EChartsOption } from '~flux/statistics/composable';

const FOREGROUND_LABEL = { show: true, color: 'var(--foreground-secondary)' } as const;
const HIDDEN_AXIS = { show: false } as const;
const DASHED_SPLIT_LINE = { show: true, lineStyle: { type: 'dashed' as const, color: 'var(--gray-200)' } } as const;

export interface CartesianBaseConfig {
    readonly xAxisType?: 'category' | 'value';
    readonly yAxisType?: 'value' | 'category';
    readonly scale?: boolean;
    readonly tooltipTrigger?: 'axis' | 'item';
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
}

export function buildCartesianGrid(xAxisLabels: boolean, yAxisLabels: boolean): EChartsOption['grid'] {
    if (!xAxisLabels && !yAxisLabels) {
        return { left: 0, right: 0, top: 0, bottom: 0, containLabel: false };
    }

    return {
        left: yAxisLabels ? 21 : 0,
        right: 21,
        top: 21,
        bottom: xAxisLabels ? 21 : 0,
        containLabel: true
    };
}

export function buildCartesianBaseOptions(config: CartesianBaseConfig = {}): EChartsOption {
    const xAxisLabels = config.xAxisLabels ?? false;
    const yAxisLabels = config.yAxisLabels ?? false;
    const showSplitLines = config.splitLines ?? false;

    const xSplitLine = showSplitLines && config.xAxisType === 'value' ? DASHED_SPLIT_LINE : HIDDEN_AXIS;
    const ySplitLine = showSplitLines && config.yAxisType !== 'category' ? DASHED_SPLIT_LINE : HIDDEN_AXIS;

    return {
        grid: buildCartesianGrid(xAxisLabels, yAxisLabels),
        tooltip: {
            appendTo: 'body',
            snap: true,
            trigger: config.tooltipTrigger ?? 'item'
        },
        xAxis: {
            type: config.xAxisType ?? 'category',
            show: true,
            scale: config.scale && config.xAxisType === 'value',
            splitLine: xSplitLine,
            axisLabel: xAxisLabels ? FOREGROUND_LABEL : HIDDEN_AXIS,
            axisLine: HIDDEN_AXIS,
            axisTick: HIDDEN_AXIS
        },
        yAxis: {
            type: config.yAxisType ?? 'value',
            show: true,
            scale: config.scale && config.yAxisType !== 'category',
            splitLine: ySplitLine,
            axisLabel: yAxisLabels ? FOREGROUND_LABEL : HIDDEN_AXIS,
            axisLine: HIDDEN_AXIS,
            axisTick: HIDDEN_AXIS
        }
    };
}
