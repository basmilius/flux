import './css/index.scss';
import type { FluxStatisticsChartColor } from '@flux-ui/types';
import { CHART_DEFAULT_COLORS } from './util';

export * from './component';
export * from './composable';
export * from './data';

export type { ChartTooltipValueFormatter, SharedTooltipItem, Translator } from './util';

export const CHART_COLORS: readonly FluxStatisticsChartColor[] = CHART_DEFAULT_COLORS;

export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = Array.from(
    {length: 17},
    (_, index): FluxStatisticsChartColor => `var(--chart-colorful-${index + 1})`
);
