import type { EChartsOption } from '~flux/statistics/composable';
import { CHART_DEFAULT_COLORS } from '../series';

export function buildBaseOptions(): EChartsOption {
    return {
        color: [...CHART_DEFAULT_COLORS],
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
