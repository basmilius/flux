import type { EChartsOption } from '~flux/statistics/composable';

const FOREGROUND_LABEL = {show: true, color: 'var(--foreground-secondary)'} as const;
const HIDDEN_AXIS = {show: false} as const;
const DASHED_SPLIT_LINE = {show: true, lineStyle: {type: 'dashed' as const, color: 'var(--gray-200)'}} as const;

export interface CartesianBaseConfig {
    readonly xAxisType?: 'category' | 'value';
    readonly yAxisType?: 'value' | 'category';
    readonly scale?: boolean;
    readonly tooltipTrigger?: 'axis' | 'item';
    readonly xAxisLabels?: boolean;
    readonly yAxisLabels?: boolean;
    readonly splitLines?: boolean;
    readonly minPadding?: number;
}

export function buildCartesianGrid(xAxisLabels: boolean, yAxisLabels: boolean, minPadding: number = 0): EChartsOption['grid'] {
    if (!xAxisLabels && !yAxisLabels) {
        return {left: minPadding, right: minPadding, top: minPadding, bottom: minPadding, containLabel: false};
    }

    return {
        left: yAxisLabels ? 21 : minPadding,
        right: 21,
        top: 21,
        bottom: xAxisLabels ? 21 : minPadding,
        containLabel: true
    };
}

export function buildCartesianBaseOptions(config: CartesianBaseConfig = {}): EChartsOption {
    const xAxisLabels = config.xAxisLabels ?? false;
    const yAxisLabels = config.yAxisLabels ?? false;
    const showSplitLines = config.splitLines ?? false;
    const minPadding = config.minPadding ?? 0;

    const xSplitLine = showSplitLines && config.xAxisType === 'value' ? DASHED_SPLIT_LINE : HIDDEN_AXIS;
    const ySplitLine = showSplitLines && config.yAxisType !== 'category' ? DASHED_SPLIT_LINE : HIDDEN_AXIS;

    return {
        grid: buildCartesianGrid(xAxisLabels, yAxisLabels, minPadding),
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
