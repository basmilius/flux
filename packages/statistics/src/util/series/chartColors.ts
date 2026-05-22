import type { FluxStatisticsChartColor } from '@flux-ui/types';

export const CHART_DEFAULT_COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)'
] as const;

export function resolveChartColor(color?: FluxStatisticsChartColor): string | undefined {
    if (!color) {
        return undefined;
    }

    if (color.startsWith('#') || color.startsWith('var(')) {
        return color;
    }

    return `var(--${color}-600)`;
}
