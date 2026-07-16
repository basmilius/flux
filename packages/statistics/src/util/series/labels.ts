import type { FluxStatisticsChartCartesianSeries, FluxStatisticsChartCategoryPoint } from '@flux-ui/types';

export function extractLabels(
    series: readonly { readonly data: readonly (number | FluxStatisticsChartCategoryPoint)[] }[]
): readonly string[] | undefined {
    for (const s of series) {
        const labels: string[] = [];
        let hasAny = false;

        for (const point of s.data) {
            if (typeof point === 'object' && point !== null && typeof point.label === 'string') {
                labels.push(point.label);
                hasAny = true;
            } else {
                labels.push('');
            }
        }

        if (hasAny) {
            return labels;
        }
    }

    return undefined;
}

export function cartesianFallbackLabels(series: readonly FluxStatisticsChartCartesianSeries[]): string[] {
    const longest = series.reduce((max, s) => Math.max(max, s.data.length), 0);
    return Array.from({length: longest}, (_, i) => String(i + 1));
}
