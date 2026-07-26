import type { FluxStatisticsChartColor } from '@flux-ui/types';

export * from './component';
export * from './composable';

export type { ChartTooltipValueFormatter, SharedTooltipItem, Translator } from './util';

export const CHART_COLORS: readonly FluxStatisticsChartColor[] = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
    'var(--chart-6)',
    'var(--chart-7)',
    'var(--chart-8)'
];

// Seventeen hues around the wheel, in the same order the fixed Tailwind stops
// walked it. They are tokens now, so the set follows the theme instead of
// staying the same colour on a dark surface.
export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = Array.from(
    {length: 17},
    (_, index): FluxStatisticsChartColor => `var(--chart-colorful-${index + 1})`
);
