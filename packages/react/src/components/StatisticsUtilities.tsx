import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Context, RefObject } from 'react';
import { init } from 'echarts';
import type { ECharts } from 'echarts';
import type { FluxIconName, FluxStatisticsChartAreaSeries, FluxStatisticsChartBarSeries, FluxStatisticsChartBoxPlotSeries, FluxStatisticsChartBubbleSeries, FluxStatisticsChartCandlestickSeries, FluxStatisticsChartCartesianSeries, FluxStatisticsChartColor, FluxStatisticsChartGaugeSeries, FluxStatisticsChartHeatmapSeries, FluxStatisticsChartLineSeries, FluxStatisticsChartMixedSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries, FluxStatisticsChartScatterSeries, FluxStatisticsChartTreemapNode } from '../types';

export type EChartsOption = Record<string, any>;
export type EChartsInstance = ECharts;
export const CHART_DEFAULT_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)'] as const;
export const CHART_COLORS: readonly FluxStatisticsChartColor[] = CHART_DEFAULT_COLORS;
export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = Array.from({ length: 17 }, (_, index) => `var(--chart-colorful-${index + 1})` as FluxStatisticsChartColor);
export const CHART_FONT_FAMILY = 'var(--font-sans)';
export const CHART_TEXT_2XSMALL = { fontFamily: CHART_FONT_FAMILY, fontSize: 10, lineHeight: 12 } as const;
export const CHART_TEXT_XSMALL = { fontFamily: CHART_FONT_FAMILY, fontSize: 12, lineHeight: 15 } as const;

const FLUX_COLORS = new Set(['gray', 'primary', 'danger', 'info', 'success', 'warning']);
export function resolveChartColor(color?: FluxStatisticsChartColor): string | undefined {
    return color && FLUX_COLORS.has(color) ? `var(--${color}-solid)` : color;
}
function resolveCssVar(value: string, root?: HTMLElement | null): string {
    if (!value.startsWith('var(')) return value;
    const property = value.slice(4, value.indexOf(')')).split(',')[0].trim();
    if (typeof getComputedStyle === 'undefined') return value;
    return (
        getComputedStyle(root ?? document.documentElement)
            .getPropertyValue(property)
            .trim() || value
    );
}
export function deepResolveCssVars<T>(value: T, root?: HTMLElement | null): T {
    if (typeof value === 'string') return resolveCssVar(value, root) as T;
    if (Array.isArray(value)) return value.map((item) => deepResolveCssVars(item, root)) as T;
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepResolveCssVars(item, root)])) as T;
    return value;
}
export function useCssVarVersion(): number {
    const [version, setVersion] = useState(0);
    useEffect(() => {
        if (typeof MutationObserver === 'undefined') return;
        const observer = new MutationObserver(() => setVersion((value) => value + 1));
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
        return () => observer.disconnect();
    }, []);
    return version;
}

export interface UseEChartsReturn {
    readonly chartInstance: EChartsInstance | null;
    resize(): void;
}
export function useECharts(target: RefObject<HTMLElement | null>, options: EChartsOption): UseEChartsReturn {
    const instance = useRef<EChartsInstance | null>(null),
        [, render] = useState(0);
    useEffect(() => {
        const element = target.current;
        if (!element) return;
        try {
            instance.current = init(element);
            instance.current.setOption(options);
            render((value) => value + 1);
        } catch {
            instance.current = null;
        }
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => instance.current?.resize());
        observer?.observe(element);
        return () => {
            observer?.disconnect();
            instance.current?.dispose();
            instance.current = null;
        };
    }, [target]);
    useEffect(() => {
        instance.current?.setOption(options, { notMerge: true });
    }, [options]);
    return { chartInstance: instance.current, resize: () => instance.current?.resize() };
}

export type Translator = (key: string) => string;
export interface SharedTooltipItem {
    readonly name: string;
    readonly value: string | number;
    readonly color?: string;
    readonly icon?: FluxIconName;
    readonly seriesIndex?: number;
    readonly dataIndex?: number;
}
export type ChartTooltipValueFormatter = (value: number | string, item: SharedTooltipItem) => string;
export interface TooltipParam {
    readonly name?: string;
    readonly value: number | string | readonly unknown[];
    readonly color?: string;
    readonly marker?: string;
    readonly seriesIndex?: number;
    readonly dataIndex?: number;
}
export type TooltipStyleClasses = Readonly<Record<string, string>>;
export function extractValue(value: TooltipParam['value']): number | string {
    return typeof value === 'number' || typeof value === 'string' ? value : String(value.at(-1) ?? '');
}
export function formatValue(value: TooltipParam['value']): string {
    const extracted = extractValue(value);
    return typeof extracted === 'number' ? new Intl.NumberFormat().format(extracted) : String(extracted);
}
export function renderTooltip(title: string | undefined, items: readonly SharedTooltipItem[]): string {
    const escape = (value: unknown) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[character]!);
    return `<div>${title ? `<strong>${escape(title)}</strong>` : ''}${items.map((item) => `<div><span style="background:${escape(item.color ?? 'currentColor')}"></span>${escape(item.name)} <b>${escape(item.value)}</b></div>`).join('')}</div>`;
}
export function renderIconSvg(_name: FluxIconName | undefined, color: string, size = 14): string {
    return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="${String(color).replace(/["<>]/g, '')}"/></svg>`;
}

export interface ChartLegendItem {
    readonly color?: string;
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly seriesIndex?: number;
    readonly value?: string | number;
}
export interface ChartLegendContext {
    readonly items: readonly ChartLegendItem[];
    readonly hoveredIndex: number | null;
    setItems(items: readonly ChartLegendItem[]): void;
    setHoveredIndex(index: number | null): void;
}
export function createChartLegendContext(): ChartLegendContext {
    let items: readonly ChartLegendItem[] = [],
        hoveredIndex: number | null = null;
    return {
        get items() {
            return items;
        },
        get hoveredIndex() {
            return hoveredIndex;
        },
        setItems(value) {
            items = value;
        },
        setHoveredIndex(value) {
            hoveredIndex = value;
        },
    };
}
export const FluxStatisticsChartLegendInjectionKey: Context<ChartLegendContext | null> = createContext<ChartLegendContext | null>(null);
export type FluxStatisticsLegendVariant = 'detailed' | 'compact';
export const FluxStatisticsLegendVariantInjectionKey: Context<FluxStatisticsLegendVariant> = createContext<FluxStatisticsLegendVariant>('detailed');
export interface UseChartBaseSetupReturn {
    readonly t: Translator;
}
export function useChartBaseSetup(): UseChartBaseSetupReturn {
    return { t: (key) => key };
}
export type ChartHoverSyncMode = 'data' | 'series';
export interface UseChartHoverSyncOptions {
    readonly mode?: ChartHoverSyncMode;
}
export function useChartHoverSync(chart: EChartsInstance | null, legend: ChartLegendContext | null, options: UseChartHoverSyncOptions = {}): void {
    useEffect(() => {
        if (!chart || !legend || legend.hoveredIndex === null) return;
        chart.dispatchAction({ type: 'highlight', [options.mode === 'data' ? 'dataIndex' : 'seriesIndex']: legend.hoveredIndex });
        return () => {
            chart.dispatchAction({ type: 'downplay' });
        };
    }, [chart, legend?.hoveredIndex, options.mode]);
}
export interface ChartSeriesShape {
    readonly name?: string;
    readonly icon?: FluxIconName;
    readonly color?: FluxStatisticsChartColor;
}
export type ChartLegendItemBuilder<S> = (series: S, color: string, index: number, t: Translator) => ChartLegendItem | readonly ChartLegendItem[];
export interface UseChartSeriesSetupOptions<S extends ChartSeriesShape> {
    readonly mode?: ChartHoverSyncMode;
    readonly getLegendItem?: ChartLegendItemBuilder<S>;
}
export interface UseChartSeriesSetupReturn {
    readonly t: Translator;
    readonly palette: readonly string[];
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: EChartsInstance | null;
}
export function useChartSeriesSetup<S extends ChartSeriesShape>(seriesGetter: () => readonly S[], options: UseChartSeriesSetupOptions<S> = {}): UseChartSeriesSetupReturn {
    const legendContext = useContext(FluxStatisticsChartLegendInjectionKey),
        t: Translator = (key) => key,
        series = seriesGetter(),
        palette = series.map((item, index) => resolveChartColor(item.color) ?? CHART_DEFAULT_COLORS[index % CHART_DEFAULT_COLORS.length]);
    useEffect(() => {
        legendContext?.setItems(
            series.flatMap((item, index) => {
                const result = options.getLegendItem?.(item, palette[index], index, t) ?? { color: palette[index], icon: item.icon, label: item.name ? t(item.name) : '', seriesIndex: index };
                return Array.isArray(result) ? result : [result as ChartLegendItem];
            }),
        );
    }, [legendContext, series, palette, options.getLegendItem]);
    return { t, palette, legendContext, chartInstance: null };
}
export interface UseChartSlicesSetupReturn {
    readonly t: Translator;
    readonly palette: readonly string[];
    readonly tooltipItems: readonly SharedTooltipItem[];
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: EChartsInstance | null;
}
export function useChartSlicesSetup(slicesGetter: () => readonly FluxStatisticsChartPieSlice[]): UseChartSlicesSetupReturn {
    const legendContext = useContext(FluxStatisticsChartLegendInjectionKey),
        slices = slicesGetter(),
        palette = slices.map((item, index) => resolveChartColor(item.color) ?? CHART_DEFAULT_COLORS[index % CHART_DEFAULT_COLORS.length]),
        tooltipItems = slices.map((item, index) => ({ name: item.label, value: item.formatted ?? item.value, color: palette[index], icon: item.icon, dataIndex: index, seriesIndex: 0 }));
    useEffect(() => legendContext?.setItems(tooltipItems.map((item) => ({ ...item, label: item.name }))), [legendContext, tooltipItems]);
    return { t: (key) => key, palette, tooltipItems, legendContext, chartInstance: null };
}

export function buildBaseOptions(): EChartsOption {
    return { animationDuration: 300, color: [...CHART_DEFAULT_COLORS], textStyle: { fontFamily: CHART_FONT_FAMILY } };
}
export interface CartesianBaseConfig {
    labels?: readonly string[];
    splitLines?: boolean;
    xAxisLabels?: boolean;
    yAxisLabels?: boolean;
}
export function buildCartesianGrid(xAxisLabels = false, yAxisLabels = false, minPadding = 0): EChartsOption['grid'] {
    return { left: Math.max(minPadding, yAxisLabels ? 42 : 9), right: Math.max(minPadding, 9), top: 9, bottom: Math.max(minPadding, xAxisLabels ? 30 : 9), containLabel: false };
}
export function buildCartesianBaseOptions(config: CartesianBaseConfig = {}): EChartsOption {
    return { ...buildBaseOptions(), grid: buildCartesianGrid(config.xAxisLabels, config.yAxisLabels), xAxis: { type: 'category', data: config.labels, axisLabel: { show: config.xAxisLabels }, splitLine: { show: false } }, yAxis: { type: 'value', axisLabel: { show: config.yAxisLabels }, splitLine: { show: config.splitLines } } };
}
export function buildCircularBaseOptions(): EChartsOption {
    return { ...buildBaseOptions(), tooltip: { trigger: 'item' } };
}
export function extractLabels(series: readonly FluxStatisticsChartCartesianSeries[], labels?: readonly string[]): string[] {
    if (labels) return [...labels];
    return series[0]?.data.map((point, index) => (typeof point === 'number' ? String(index + 1) : (point.label ?? String(index + 1)))) ?? [];
}
export function cartesianFallbackLabels(series: readonly FluxStatisticsChartCartesianSeries[]): string[] {
    return extractLabels(series);
}
const values = (data: FluxStatisticsChartCartesianSeries['data']) => data.map((point) => (typeof point === 'number' ? point : point.value));
export const LINE_SERIES_DEFAULTS = { type: 'line', smooth: true, showSymbol: false } as const;
export const AREA_SERIES_DEFAULTS = { ...LINE_SERIES_DEFAULTS, areaStyle: { opacity: 0.25 } } as const;
export const BAR_SERIES_DEFAULTS = { type: 'bar', itemStyle: { borderRadius: [3, 3, 0, 0] } } as const;
export const PIE_SERIES_DEFAULTS = { type: 'pie', radius: '75%' } as const;
export const DONUT_SERIES_DEFAULTS = { type: 'pie', radius: ['55%', '80%'] } as const;
export const POLAR_AREA_SERIES_DEFAULTS = { type: 'pie', roseType: 'radius', radius: ['15%', '80%'] } as const;
export const RADAR_SERIES_DEFAULTS = { type: 'radar' } as const;
export const HEATMAP_SERIES_DEFAULTS = { type: 'heatmap' } as const;
export const SCATTER_SERIES_DEFAULTS = { type: 'scatter' } as const;
export const BUBBLE_SERIES_DEFAULTS = { type: 'scatter' } as const;
export const BOXPLOT_SERIES_DEFAULTS = { type: 'boxplot' } as const;
export const CANDLESTICK_SERIES_DEFAULTS = { type: 'candlestick' } as const;
export const TREEMAP_SERIES_DEFAULTS = { type: 'treemap' } as const;
export const GAUGE_SERIES_DEFAULTS = { type: 'gauge' } as const;
export function toLineSeries(series: FluxStatisticsChartLineSeries, color: string) {
    return { ...LINE_SERIES_DEFAULTS, name: series.name, data: values(series.data), color: resolveChartColor(series.color) ?? color };
}
export function toAreaSeries(series: FluxStatisticsChartAreaSeries, color: string) {
    return { ...AREA_SERIES_DEFAULTS, name: series.name, data: values(series.data), color: resolveChartColor(series.color) ?? color };
}
export function toBarSeries(series: FluxStatisticsChartBarSeries, color: string) {
    return { ...BAR_SERIES_DEFAULTS, name: series.name, data: values(series.data), color: resolveChartColor(series.color) ?? color };
}
export function toMixedSeries(series: FluxStatisticsChartMixedSeries, color: string) {
    return series.type === 'bar' ? toBarSeries(series, color) : series.type === 'area' ? toAreaSeries(series, color) : toLineSeries(series, color);
}
const pieData = (slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]) => slices.map((slice, index) => ({ name: slice.label, value: slice.value, itemStyle: { color: resolveChartColor(slice.color) ?? palette[index % palette.length] } }));
export function toPieSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]) {
    return { ...PIE_SERIES_DEFAULTS, data: pieData(slices, palette) };
}
export function toDonutSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]) {
    return { ...DONUT_SERIES_DEFAULTS, data: pieData(slices, palette) };
}
export function toPolarAreaSeries(slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]) {
    return { ...POLAR_AREA_SERIES_DEFAULTS, data: pieData(slices, palette) };
}
export function toRadarSeries(series: readonly FluxStatisticsChartRadarSeries[], palette: readonly string[]) {
    return { ...RADAR_SERIES_DEFAULTS, data: series.map((item) => ({ name: item.name, value: item.values })), color: [...palette] };
}
export function toScatterSeries(series: FluxStatisticsChartScatterSeries, color: string) {
    return { ...SCATTER_SERIES_DEFAULTS, name: series.name, data: series.data.map((point) => [point.x, point.y]), color: resolveChartColor(series.color) ?? color };
}
export function toBubbleSeries(series: FluxStatisticsChartBubbleSeries, color: string) {
    const max = Math.max(1, ...series.data.map((point) => point.size));
    return { ...BUBBLE_SERIES_DEFAULTS, name: series.name, data: series.data.map((point) => [point.x, point.y, point.size]), symbolSize: (point: readonly number[]) => 14 + ((point[2] ?? 0) / max) * 30, color: resolveChartColor(series.color) ?? color };
}
export function toCandlestickSeries(series: FluxStatisticsChartCandlestickSeries) {
    const positive = resolveChartColor(series.positiveColor) ?? 'var(--chart-positive)',
        negative = resolveChartColor(series.negativeColor) ?? 'var(--chart-negative)';
    return { ...CANDLESTICK_SERIES_DEFAULTS, name: series.name, data: series.data.map((point) => [point.open, point.close, point.low, point.high]), itemStyle: { color: positive, color0: negative, borderColor: positive, borderColor0: negative } };
}
export function toBoxPlotSeries(series: FluxStatisticsChartBoxPlotSeries, color: string) {
    return { ...BOXPLOT_SERIES_DEFAULTS, name: series.name, data: series.data.map((point) => [point.min, point.q1, point.median, point.q3, point.max]), itemStyle: { color: resolveChartColor(series.color) ?? color } };
}
export function toHeatmapSeries(series: FluxStatisticsChartHeatmapSeries, xLabels: readonly (string | number)[], yLabels: readonly (string | number)[]) {
    return { ...HEATMAP_SERIES_DEFAULTS, name: series.name, data: series.data.map((point) => [typeof point.x === 'number' ? point.x : xLabels.indexOf(point.x), typeof point.y === 'number' ? point.y : yLabels.indexOf(point.y), point.value]) };
}
export function toTreemapSeries(nodes: readonly FluxStatisticsChartTreemapNode[], palette: readonly string[]) {
    const map = (node: FluxStatisticsChartTreemapNode, index: number): object => ({ name: node.name, value: node.value, itemStyle: { color: resolveChartColor(node.color) ?? palette[index % palette.length] }, children: node.children?.map(map) });
    return { ...TREEMAP_SERIES_DEFAULTS, data: nodes.map(map) };
}
export function toGaugeSeries(series: FluxStatisticsChartGaugeSeries, color: string, index: number, total: number) {
    const resolved = resolveChartColor(series.color) ?? color;
    return { ...GAUGE_SERIES_DEFAULTS, radius: `${series.radius ?? 90 - index * (total > 1 ? 30 : 0)}%`, data: [{ name: series.name, value: series.value, itemStyle: { color: resolved } }], progress: { show: true, width: 14, roundCap: true, itemStyle: { color: resolved } } };
}

function mergeOptions(base: EChartsOption, advanced?: EChartsOption): EChartsOption {
    return { ...base, ...advanced, series: advanced?.series ?? base.series };
}
interface CartesianInput<S> extends CartesianBaseConfig {
    series: readonly S[];
    advancedOptions?: EChartsOption;
    palette?: readonly string[];
    tooltip?: boolean;
    tooltipValueFormatter?: ChartTooltipValueFormatter;
    t?: Translator;
    styles?: TooltipStyleClasses;
}
const paletteOf = (series: readonly { color?: FluxStatisticsChartColor }[], palette?: readonly string[]) => palette ?? series.map((item, index) => resolveChartColor(item.color) ?? CHART_DEFAULT_COLORS[index % CHART_DEFAULT_COLORS.length]);
export interface LineChartOptionsInput extends CartesianInput<FluxStatisticsChartLineSeries> {}
export interface AreaChartOptionsInput extends CartesianInput<FluxStatisticsChartAreaSeries> {}
export interface BarChartOptionsInput extends CartesianInput<FluxStatisticsChartBarSeries> {}
export interface MixedChartOptionsInput extends CartesianInput<FluxStatisticsChartMixedSeries> {}
export interface ScatterChartOptionsInput extends Omit<CartesianInput<FluxStatisticsChartScatterSeries>, 'labels'> {}
export interface BubbleChartOptionsInput extends Omit<CartesianInput<FluxStatisticsChartBubbleSeries>, 'labels'> {}
export interface BoxPlotChartOptionsInput extends CartesianInput<FluxStatisticsChartBoxPlotSeries> {}
export interface CandlestickChartOptionsInput extends CartesianInput<FluxStatisticsChartCandlestickSeries> {}
export function buildLineChartOptions(input: LineChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: extractLabels(input.series, input.labels) }), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toLineSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildAreaChartOptions(input: AreaChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: extractLabels(input.series, input.labels) }), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toAreaSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildBarChartOptions(input: BarChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: extractLabels(input.series, input.labels) }), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toBarSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildMixedChartOptions(input: MixedChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: extractLabels(input.series, input.labels) }), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toMixedSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildScatterChartOptions(input: ScatterChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions(input), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toScatterSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildBubbleChartOptions(input: BubbleChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions(input), tooltip: { show: input.tooltip, trigger: 'axis' }, series: input.series.map((item, index) => toBubbleSeries(item, palette[index])) }, input.advancedOptions);
}
export function buildBoxPlotChartOptions(input: BoxPlotChartOptionsInput): EChartsOption {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: input.labels ?? input.series[0]?.data.map((item) => item.label ?? '') }), tooltip: { show: input.tooltip }, series: input.series.map((item, index) => toBoxPlotSeries(item, palette[index])) }, input.advancedOptions);
}
export function candlestickLegendItemBuilder(series: FluxStatisticsChartCandlestickSeries): readonly ChartLegendItem[] {
    return [
        { color: resolveChartColor(series.positiveColor), label: `${series.name ?? ''} positive` },
        { color: resolveChartColor(series.negativeColor), label: `${series.name ?? ''} negative` },
    ];
}
export function buildCandlestickChartOptions(input: CandlestickChartOptionsInput): EChartsOption {
    return mergeOptions({ ...buildCartesianBaseOptions({ ...input, labels: input.labels ?? input.series[0]?.data.map((item) => item.label ?? '') }), tooltip: { show: input.tooltip }, series: input.series.map(toCandlestickSeries) }, input.advancedOptions);
}
interface SliceInput {
    slices: readonly FluxStatisticsChartPieSlice[];
    advancedOptions?: EChartsOption;
    palette?: readonly string[];
    title?: string;
    tooltip?: boolean;
    tooltipValueFormatter?: ChartTooltipValueFormatter;
    tooltipItems?: readonly SharedTooltipItem[];
    t?: Translator;
    styles?: TooltipStyleClasses;
}
export interface PieChartOptionsInput extends SliceInput {}
export interface DonutChartOptionsInput extends SliceInput {}
export interface PolarAreaChartOptionsInput extends SliceInput {}
const circular = (input: SliceInput, convert: (slices: readonly FluxStatisticsChartPieSlice[], palette: readonly string[]) => object) => {
    const palette = paletteOf(input.slices, input.palette);
    return mergeOptions({ ...buildCircularBaseOptions(), title: input.title ? { text: input.title, left: 'center', top: 'center' } : undefined, tooltip: { show: input.tooltip, trigger: 'item' }, series: [convert(input.slices, palette)] }, input.advancedOptions);
};
export function buildPieChartOptions(input: PieChartOptionsInput) {
    return circular(input, toPieSeries);
}
export function buildDonutChartOptions(input: DonutChartOptionsInput) {
    return circular(input, toDonutSeries);
}
export function buildPolarAreaChartOptions(input: PolarAreaChartOptionsInput) {
    return circular(input, toPolarAreaSeries);
}
export interface RadarChartOptionsInput {
    series: readonly FluxStatisticsChartRadarSeries[];
    indicators: readonly FluxStatisticsChartRadarIndicator[];
    advancedOptions?: EChartsOption;
    palette?: readonly string[];
    tooltip?: boolean;
    t?: Translator;
    styles?: TooltipStyleClasses;
}
export function buildRadarChartOptions(input: RadarChartOptionsInput) {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCircularBaseOptions(), radar: { indicator: input.indicators }, tooltip: { show: input.tooltip }, series: [toRadarSeries(input.series, palette)] }, input.advancedOptions);
}
export interface GaugeChartOptionsInput {
    series: readonly FluxStatisticsChartGaugeSeries[];
    advancedOptions?: EChartsOption;
    palette?: readonly string[];
    tooltip?: boolean;
    t?: Translator;
    styles?: TooltipStyleClasses;
}
export function gaugeLegendItemBuilder(series: FluxStatisticsChartGaugeSeries, color: string): ChartLegendItem {
    return { color, icon: series.icon, label: series.name, value: series.value };
}
export function buildGaugeChartOptions(input: GaugeChartOptionsInput) {
    const palette = paletteOf(input.series, input.palette);
    return mergeOptions({ ...buildCircularBaseOptions(), tooltip: { show: input.tooltip }, series: input.series.map((item, index) => toGaugeSeries(item, palette[index], index, input.series.length)) }, input.advancedOptions);
}
export interface HeatmapChartOptionsInput {
    series: readonly FluxStatisticsChartHeatmapSeries[];
    xLabels?: readonly string[];
    yLabels?: readonly string[];
    xAxisLabels?: boolean;
    yAxisLabels?: boolean;
    tooltip?: boolean;
    advancedOptions?: EChartsOption;
    t?: Translator;
    styles?: TooltipStyleClasses;
}
export function buildHeatmapChartOptions(input: HeatmapChartOptionsInput) {
    const xLabels = input.xLabels ?? [],
        yLabels = input.yLabels ?? [];
    return mergeOptions({ ...buildCartesianBaseOptions({ labels: xLabels, xAxisLabels: input.xAxisLabels, yAxisLabels: input.yAxisLabels }), yAxis: { type: 'category', data: yLabels }, tooltip: { show: input.tooltip }, visualMap: { min: Math.min(0, ...input.series.flatMap((item) => item.data.map((point) => point.value))), max: Math.max(1, ...input.series.flatMap((item) => item.data.map((point) => point.value))), show: false }, series: input.series.map((item) => toHeatmapSeries(item, xLabels, yLabels)) }, input.advancedOptions);
}
export interface TreemapChartOptionsInput {
    nodes: readonly FluxStatisticsChartTreemapNode[];
    advancedOptions?: EChartsOption;
    tooltip?: boolean;
    t?: Translator;
    styles?: TooltipStyleClasses;
}
export function buildTreemapChartOptions(input: TreemapChartOptionsInput) {
    return mergeOptions({ ...buildCircularBaseOptions(), tooltip: { show: input.tooltip }, series: [toTreemapSeries(input.nodes, CHART_DEFAULT_COLORS)] }, input.advancedOptions);
}

export type SparklineVariant = 'line' | 'bar' | 'area';
export interface SparklineSeriesItem {
    readonly name?: string;
    readonly data: (number | string | null)[];
}
export function buildSparklineOptions(variant: SparklineVariant, color: string, series: readonly SparklineSeriesItem[]): EChartsOption {
    return { animation: false, grid: { left: 0, right: 0, top: 0, bottom: 0 }, tooltip: { show: false }, xAxis: { type: 'category', show: false, boundaryGap: variant === 'bar' }, yAxis: { type: 'value', show: false, scale: true }, color: [color], series: variant === 'bar' ? [{ type: 'bar', data: series[0]?.data ?? [], itemStyle: { borderRadius: 2 }, silent: true }] : [{ type: 'line', data: series[0]?.data ?? [], smooth: true, showSymbol: false, areaStyle: variant === 'area' ? { opacity: 0.25 } : undefined, silent: true }] };
}

type TooltipInput = { t?: Translator; styles?: TooltipStyleClasses } & Record<string, unknown>;
const tooltip = (input: TooltipInput): EChartsOption => ({ tooltip: { show: true, formatter: (params: unknown) => renderTooltip(undefined, Array.isArray(params) ? params.map((param: TooltipParam) => ({ name: param.name ?? '', value: formatValue(param.value), color: param.color })) : []) } });
export type BoxPlotTooltipPoint = SharedTooltipItem;
export interface BoxPlotTooltipInput extends TooltipInput {}
export type CandlestickTooltipPoint = SharedTooltipItem;
export interface CandlestickTooltipInput extends TooltipInput {}
export interface CartesianTooltipInput extends TooltipInput {}
export interface GaugeTooltipInput extends TooltipInput {}
export type HeatmapTooltipPoint = SharedTooltipItem;
export interface HeatmapTooltipInput extends TooltipInput {}
export interface RadarTooltipInput extends TooltipInput {}
export interface SharedItemTooltipInput extends TooltipInput {}
export type TreemapTooltipNode = SharedTooltipItem;
export interface TreemapTooltipInput extends TooltipInput {}
export const buildBoxPlotTooltip = tooltip,
    buildCandlestickTooltip = tooltip,
    buildCartesianTooltip = tooltip,
    buildGaugeTooltip = tooltip,
    buildHeatmapTooltip = tooltip,
    buildRadarTooltip = tooltip,
    buildSharedItemTooltip = tooltip,
    buildTreemapTooltip = tooltip;
