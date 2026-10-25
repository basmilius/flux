import type { EChartsOption } from '../../StatisticsUtilities';

export function buildCircularBaseOptions(): EChartsOption {
    return {
        tooltip: {show: false},
        xAxis: {show: false},
        yAxis: {show: false},
        grid: {show: false}
    };
}
