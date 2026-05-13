import type { EChartsOption } from '~flux/statistics/composable';

const FOREGROUND_LABEL = { show: true, color: 'var(--foreground-secondary)' } as const;
const HIDDEN_AXIS = { show: false } as const;

interface CartesianBaseConfig {
    readonly xAxisType?: 'category' | 'value';
    readonly yAxisType?: 'value' | 'category';
    readonly scale?: boolean;
    readonly dashedSplitLines?: boolean;
    readonly tooltipTrigger?: 'axis' | 'item';
}

export function buildCartesianBaseOptions(config: CartesianBaseConfig = {}): EChartsOption {
    const splitLineStyle = config.dashedSplitLines
        ? { lineStyle: { type: 'dashed' as const, color: 'var(--gray-200)' } }
        : HIDDEN_AXIS;

    return {
        grid: {
            left: 9,
            right: 9,
            top: 18,
            bottom: 24,
            containLabel: true
        },
        tooltip: { trigger: config.tooltipTrigger ?? 'item' },
        xAxis: {
            type: config.xAxisType ?? 'category',
            show: true,
            scale: config.scale && config.xAxisType === 'value',
            splitLine: config.xAxisType === 'value' ? splitLineStyle : HIDDEN_AXIS,
            axisLabel: FOREGROUND_LABEL,
            axisLine: HIDDEN_AXIS,
            axisTick: HIDDEN_AXIS
        },
        yAxis: {
            type: config.yAxisType ?? 'value',
            show: true,
            scale: config.scale && config.yAxisType !== 'category',
            splitLine: config.yAxisType === 'category' ? HIDDEN_AXIS : splitLineStyle,
            axisLabel: FOREGROUND_LABEL,
            axisLine: HIDDEN_AXIS,
            axisTick: HIDDEN_AXIS
        }
    };
}

export const POLAR_BASE_OPTIONS: EChartsOption = {
    tooltip: { show: false },
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { show: false }
};

export const SPARKLINE_AXIS_BASE: EChartsOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { show: false, boundaryGap: false },
    yAxis: { show: false, min: 'dataMin', max: 'dataMax' }
};
