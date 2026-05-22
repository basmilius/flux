import type { EChartsOption } from '~flux/statistics/composable';

export function buildBaseOptions(): EChartsOption {
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
            axisPointer: {
                appendTo: 'body',
                snap: true
            }
        },
        legend: {
            show: false
        }
    };
}
