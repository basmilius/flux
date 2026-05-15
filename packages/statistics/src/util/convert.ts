import type {
    FluxStatisticsChartAreaSeries,
    FluxStatisticsChartBarSeries,
    FluxStatisticsChartBoxPlotSeries,
    FluxStatisticsChartBubbleSeries,
    FluxStatisticsChartCandlestickSeries,
    FluxStatisticsChartCartesianSeries,
    FluxStatisticsChartCategoryPoint,
    FluxStatisticsChartColor,
    FluxStatisticsChartGaugeSeries,
    FluxStatisticsChartHeatmapSeries,
    FluxStatisticsChartLineSeries,
    FluxStatisticsChartMixedSeries,
    FluxStatisticsChartPieSlice,
    FluxStatisticsChartRadarSeries,
    FluxStatisticsChartScatterSeries,
    FluxStatisticsChartTreemapNode
} from '@flux-ui/types';
import type {
    BarSeriesOption,
    BoxplotSeriesOption,
    CandlestickSeriesOption,
    GaugeSeriesOption,
    HeatmapSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    RadarSeriesOption,
    ScatterSeriesOption,
    TreemapSeriesOption
} from 'echarts/charts';
import {
    AREA_SERIES_DEFAULTS,
    BAR_SERIES_DEFAULTS,
    BOXPLOT_SERIES_DEFAULTS,
    BUBBLE_SERIES_DEFAULTS,
    CANDLESTICK_SERIES_DEFAULTS,
    DONUT_SERIES_DEFAULTS,
    GAUGE_SERIES_DEFAULTS,
    HEATMAP_SERIES_DEFAULTS,
    LINE_SERIES_DEFAULTS,
    PIE_SERIES_DEFAULTS,
    POLAR_AREA_SERIES_DEFAULTS,
    RADAR_SERIES_DEFAULTS,
    SCATTER_SERIES_DEFAULTS,
    TREEMAP_SERIES_DEFAULTS
} from './seriesDefaults';

export function resolveChartColor(color?: FluxStatisticsChartColor): string | undefined {
    if (!color) {
        return undefined;
    }

    if (color.startsWith('#') || color.startsWith('var(')) {
        return color;
    }

    return `var(--${color}-600)`;
}

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

function extractValues(data: readonly (number | FluxStatisticsChartCategoryPoint)[]): number[] {
    return data.map(point => typeof point === 'number' ? point : point.value);
}

export function toLineSeries(s: FluxStatisticsChartLineSeries, fallbackColor: string): LineSeriesOption {
    return {
        ...LINE_SERIES_DEFAULTS,
        name: s.name,
        data: extractValues(s.data),
        color: resolveChartColor(s.color) ?? fallbackColor
    };
}

export function toAreaSeries(s: FluxStatisticsChartAreaSeries, fallbackColor: string): LineSeriesOption {
    return {
        ...AREA_SERIES_DEFAULTS,
        name: s.name,
        data: extractValues(s.data),
        color: resolveChartColor(s.color) ?? fallbackColor
    };
}

export function toBarSeries(s: FluxStatisticsChartBarSeries, fallbackColor: string): BarSeriesOption {
    return {
        ...BAR_SERIES_DEFAULTS,
        name: s.name,
        data: extractValues(s.data),
        color: resolveChartColor(s.color) ?? fallbackColor
    };
}

export function toMixedSeries(s: FluxStatisticsChartMixedSeries, fallbackColor: string): LineSeriesOption | BarSeriesOption {
    const color = resolveChartColor(s.color) ?? fallbackColor;
    const values = extractValues(s.data);

    if (s.type === 'bar') {
        return {
            ...BAR_SERIES_DEFAULTS,
            barCategoryGap: '55%',
            name: s.name,
            data: values,
            color
        };
    }

    if (s.type === 'area') {
        return {
            ...AREA_SERIES_DEFAULTS,
            name: s.name,
            data: values,
            color
        };
    }

    return {
        ...LINE_SERIES_DEFAULTS,
        lineStyle: { width: 2 },
        name: s.name,
        data: values,
        color
    };
}

interface PieDataItem {
    readonly name: string;
    readonly value: number;
    readonly itemStyle?: { readonly color: string };
}

function buildPieData(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]): PieDataItem[] {
    return slices.map((slice, idx) => {
        const color = resolveChartColor(slice.color) ?? palette[idx % palette.length];

        return {
            name: slice.label,
            value: slice.value,
            itemStyle: { color }
        };
    });
}

export function toPieSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]): PieSeriesOption {
    return {
        ...PIE_SERIES_DEFAULTS,
        data: buildPieData(slices, palette)
    };
}

export function toDonutSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]): PieSeriesOption {
    return {
        ...DONUT_SERIES_DEFAULTS,
        data: buildPieData(slices, palette)
    };
}

export function toPolarAreaSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]): PieSeriesOption {
    return {
        ...POLAR_AREA_SERIES_DEFAULTS,
        data: buildPieData(slices, palette)
    };
}

interface RadarRing {
    readonly value: readonly number[];
    readonly name?: string;
}

export function toRadarSeries(series: readonly FluxStatisticsChartRadarSeries[], palette: readonly string[]): RadarSeriesOption {
    const data: RadarRing[] = series.map(ring => ({
        value: ring.values,
        name: ring.name
    }));

    return {
        ...RADAR_SERIES_DEFAULTS,
        data,
        color: palette as string[]
    } as RadarSeriesOption;
}

export function toScatterSeries(s: FluxStatisticsChartScatterSeries, fallbackColor: string): ScatterSeriesOption {
    return {
        ...SCATTER_SERIES_DEFAULTS,
        name: s.name,
        data: s.data.map(point => [point.x, point.y]),
        color: resolveChartColor(s.color) ?? fallbackColor
    };
}

export function toBubbleSeries(s: FluxStatisticsChartBubbleSeries, fallbackColor: string): ScatterSeriesOption {
    const sizes = s.data.map(p => p.size);
    const maxSize = Math.max(1, ...sizes);

    return {
        ...BUBBLE_SERIES_DEFAULTS,
        name: s.name,
        data: s.data.map(point => [point.x, point.y, point.size]),
        symbolSize: (val: unknown) => {
            const size = Array.isArray(val) ? (val[2] as number) : 0;
            return 14 + (size / maxSize) * 30;
        },
        color: resolveChartColor(s.color) ?? fallbackColor
    };
}

export function toCandlestickSeries(s: FluxStatisticsChartCandlestickSeries): CandlestickSeriesOption {
    const positive = resolveChartColor(s.positiveColor) ?? 'var(--success-500)';
    const negative = resolveChartColor(s.negativeColor) ?? 'var(--danger-500)';

    return {
        ...CANDLESTICK_SERIES_DEFAULTS,
        name: s.name,
        data: s.data.map(point => [point.open, point.close, point.low, point.high]),
        itemStyle: {
            color: positive,
            color0: negative,
            borderColor: positive,
            borderColor0: negative
        }
    };
}

export function toBoxPlotSeries(s: FluxStatisticsChartBoxPlotSeries, fallbackColor: string): BoxplotSeriesOption {
    const color = resolveChartColor(s.color) ?? fallbackColor;

    return {
        ...BOXPLOT_SERIES_DEFAULTS,
        name: s.name,
        data: s.data.map(point => [point.min, point.q1, point.median, point.q3, point.max]),
        itemStyle: {
            color,
            borderColor: 'var(--foreground-prominent)',
            borderWidth: 1
        }
    };
}

export function toHeatmapSeries(
    s: FluxStatisticsChartHeatmapSeries,
    xLabels: readonly (string | number)[],
    yLabels: readonly (string | number)[]
): HeatmapSeriesOption {
    const data = s.data.map(point => {
        const xIdx = typeof point.x === 'number' ? point.x : xLabels.indexOf(point.x);
        const yIdx = typeof point.y === 'number' ? point.y : yLabels.indexOf(point.y);

        return [xIdx, yIdx, point.value];
    });

    return {
        ...HEATMAP_SERIES_DEFAULTS,
        name: s.name,
        data
    };
}

interface TreemapDataItem {
    readonly name: string;
    readonly value?: number;
    readonly itemStyle?: { readonly color: string };
    readonly children?: TreemapDataItem[];
}

function mapTreemapNode(node: FluxStatisticsChartTreemapNode, palette: readonly string[], index: number): TreemapDataItem {
    const resolved = resolveChartColor(node.color);
    const color = resolved ?? palette[index % palette.length];

    return {
        name: node.name,
        value: node.value,
        itemStyle: { color },
        children: node.children?.map((child, idx) => mapTreemapNode(child, palette, idx))
    };
}

export function toTreemapSeries(
    nodes: readonly FluxStatisticsChartTreemapNode[],
    palette: readonly string[]
): TreemapSeriesOption {
    return {
        ...TREEMAP_SERIES_DEFAULTS,
        data: nodes.map((node, idx) => mapTreemapNode(node, palette, idx)),
        levels: [{
            itemStyle: { borderColor: 'var(--surface)', borderWidth: 3, gapWidth: 0 }
        }, {
            itemStyle: { gapWidth: 1 }
        }, {
            itemStyle: { gapWidth: 1 }
        }]
    } as TreemapSeriesOption;
}

export function toGaugeSeries(
    s: FluxStatisticsChartGaugeSeries,
    fallbackColor: string,
    index: number,
    total: number
): GaugeSeriesOption {
    const color = resolveChartColor(s.color) ?? fallbackColor;
    const ringStep = total > 1 ? 30 : 0;
    const baseRadius = s.radius ?? (90 - index * ringStep);
    const labelOffset = (total - 1 - index) * 22 - 30;

    return {
        ...GAUGE_SERIES_DEFAULTS,
        radius: `${baseRadius}%`,
        data: [{ value: s.value, name: s.name, itemStyle: { color } }],
        progress: {
            show: true,
            width: 14,
            roundCap: true,
            itemStyle: { color }
        },
        title: {
            show: true,
            color: 'var(--foreground-secondary)',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: 'inherit',
            offsetCenter: [0, `${labelOffset}%`]
        },
        detail: {
            show: total === 1,
            color: 'var(--foreground-prominent)',
            fontSize: 28,
            fontWeight: 800,
            fontFamily: 'inherit',
            offsetCenter: [0, '10%'],
            formatter: '{value}%'
        }
    } as GaugeSeriesOption;
}

export function cartesianFallbackLabels(series: readonly FluxStatisticsChartCartesianSeries[]): string[] {
    const longest = series.reduce((max, s) => Math.max(max, s.data.length), 0);
    return Array.from({ length: longest }, (_, i) => String(i + 1));
}
