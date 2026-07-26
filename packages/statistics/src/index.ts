import type { FluxStatisticsChartColor } from '@flux-ui/types';
import { CHART_DEFAULT_COLORS } from './util';

export * from './component';
export * from './composable';

export type { ChartTooltipValueFormatter, SharedTooltipItem, Translator } from './util';

// The public name for the one list a chart cycles through, so the default of a bare
// chart cannot drift from the colours the series setup hands out. The list itself is
// `CHART_DEFAULT_COLORS`, which stays internal.
export const CHART_COLORS: readonly FluxStatisticsChartColor[] = CHART_DEFAULT_COLORS;

// Seventeen hues around the wheel, in the same order the fixed Tailwind stops
// walked it. They are tokens now, so the set follows the theme instead of
// staying the same colour on a dark surface.
export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = Array.from(
    {length: 17},
    (_, index): FluxStatisticsChartColor => `var(--chart-colorful-${index + 1})`
);
