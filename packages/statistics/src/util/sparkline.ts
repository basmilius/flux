import type { EChartsOption } from '~flux/statistics/composable';

export type SparklineVariant = 'line' | 'bar' | 'area';

export interface SparklineSeriesItem {
    readonly name?: string;
    readonly data: (number | string | null)[];
}

export function buildSparklineOptions(
    variant: SparklineVariant,
    color: string,
    series: readonly SparklineSeriesItem[]
): EChartsOption {
    const data = series[0]?.data ?? [];

    const base: EChartsOption = {
        animation: false,
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: false
        },
        tooltip: { show: false },
        xAxis: {
            type: 'category',
            show: false,
            boundaryGap: variant === 'bar'
        },
        yAxis: {
            type: 'value',
            show: false,
            scale: true
        },
        color: [color]
    };

    if (variant === 'bar') {
        return {
            ...base,
            series: [{
                type: 'bar',
                data: data as never,
                itemStyle: { borderRadius: 2 },
                barCategoryGap: '40%',
                emphasis: { disabled: true },
                silent: true
            }]
        };
    }

    return {
        ...base,
        series: [{
            type: 'line',
            data: data as never,
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2 },
            areaStyle: variant === 'area' ? { opacity: 0.25 } : undefined,
            emphasis: { disabled: true },
            silent: true
        }]
    };
}
