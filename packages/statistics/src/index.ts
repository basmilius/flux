import { amber500, blue500, cyan500, emerald500, fuchsia500, green500, indigo500, lime500, orange500, pink500, purple500, red500, rose500, sky500, teal500, violet500, yellow500 } from '@flux-ui/internals';
import type { FluxStatisticsChartColor } from '@flux-ui/types';

export * from './component';
export * from './composable';

export type { ChartTooltipValueFormatter, SharedTooltipItem, Translator } from './util';

export const CHART_COLORS: readonly FluxStatisticsChartColor[] = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)'
];

export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = [
    red500,
    orange500,
    amber500,
    yellow500,
    lime500,
    green500,
    emerald500,
    teal500,
    cyan500,
    sky500,
    blue500,
    indigo500,
    violet500,
    purple500,
    fuchsia500,
    pink500,
    rose500
] as FluxStatisticsChartColor[];
