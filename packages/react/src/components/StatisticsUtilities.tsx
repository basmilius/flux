import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Context, RefObject } from 'react';
import { init } from 'echarts';
import type { ECharts } from 'echarts';
import {deepResolveCssVars} from './ChartColors';
export {deepResolveCssVars} from './ChartColors';
import type {FluxIconName, FluxStatisticsChartColor, FluxStatisticsChartPieSlice} from '../types';
import {useFluxTranslate} from '../i18n';
import {CHART_DEFAULT_COLORS, resolveChartColor, type Translator, type SharedTooltipItem} from './chart';
export * from './chart';

export type EChartsOption = Record<string, any>;
export type EChartsInstance = ECharts;
export const CHART_COLORS: readonly FluxStatisticsChartColor[] = CHART_DEFAULT_COLORS;
export const CHART_COLORFUL_COLORS: readonly FluxStatisticsChartColor[] = Array.from({length: 17}, (_, index) => `var(--chart-colorful-${index + 1})` as FluxStatisticsChartColor);
export function useCssVarVersion(): number {
    const [version, setVersion] = useState(0);
    useEffect(() => {
        if (typeof MutationObserver === 'undefined') return;
        let frame = 0;
        const update = () => {cancelAnimationFrame(frame); frame = requestAnimationFrame(() => setVersion(value => value + 1));};
        const root = new MutationObserver(update);
        root.observe(document.documentElement, {attributes: true, attributeFilter: ['class', 'style', 'data-theme']});
        const nested = new MutationObserver(update);
        nested.observe(document.documentElement, {attributes: true, attributeFilter: ['dark', 'light'], subtree: true});
        const media = window.matchMedia?.('(prefers-color-scheme: dark)');
        media?.addEventListener('change', update);
        return () => {root.disconnect(); nested.disconnect(); media?.removeEventListener('change', update); cancelAnimationFrame(frame);};
    }, []);
    return version;
}

export interface UseEChartsReturn {
    readonly chartInstance: EChartsInstance | null;
    resize(): void;
}
export function useECharts(target: RefObject<HTMLElement | null>, options: EChartsOption): UseEChartsReturn {
    const version = useCssVarVersion();
    const instance = useRef<EChartsInstance | null>(null),
        [, render] = useState(0);
    useEffect(() => {
        const element = target.current;
        if (!element) return;
        try {
            instance.current = init(element);
            instance.current.setOption(deepResolveCssVars(options, element));
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
        instance.current?.setOption(deepResolveCssVars(options, target.current), { notMerge: true });
    }, [options, target, version]);
    return { chartInstance: instance.current, resize: () => instance.current?.resize() };
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
    return {t: useFluxTranslate()};
}
export type ChartHoverSyncMode = 'data' | 'series';
export interface UseChartHoverSyncOptions {
    readonly mode?: ChartHoverSyncMode;
    readonly seriesIndex?: number;
}
export function useChartHoverSync(chart: EChartsInstance | null, legend: ChartLegendContext | null, options: UseChartHoverSyncOptions = {}): void {
    const current = useRef(legend);
    current.current = legend;
    const syncing = useRef(false);
    const mode = options.mode ?? 'series';
    useEffect(() => {
        if (!chart || !current.current) return;
        const over = (params: {seriesIndex?: number; dataIndex?: number}) => {
            if (syncing.current) return;
            const items = current.current?.items ?? [];
            const mapped = items.findIndex(item => item.seriesIndex === params.seriesIndex);
            current.current?.setHoveredIndex(mode === 'data' ? params.dataIndex ?? null : mapped >= 0 ? mapped : params.seriesIndex ?? null);
        };
        const out = () => {
            if (!syncing.current) current.current?.setHoveredIndex(null);
        };
        chart.on('mouseover', over as never);
        chart.on('mouseout', out);
        return () => {
            chart.off('mouseover', over as never);
            chart.off('mouseout', out);
        };
    }, [chart, mode]);
    useEffect(() => {
        if (!chart || !legend) return;
        syncing.current = true;
        try {
            chart.dispatchAction({type: 'downplay'});
            if (legend.hoveredIndex !== null) {
                chart.dispatchAction(mode === 'data'
                    ? {type: 'highlight', seriesIndex: options.seriesIndex ?? 0, dataIndex: legend.hoveredIndex}
                    : {type: 'highlight', seriesIndex: legend.items[legend.hoveredIndex]?.seriesIndex ?? legend.hoveredIndex});
            }
        } finally {
            syncing.current = false;
        }
    }, [chart, legend?.hoveredIndex, legend?.items, mode, options.seriesIndex]);
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
    readonly chartRef: (handle: {chartInstance: EChartsInstance | null} | null) => void;
}
export function useChartSeriesSetup<S extends ChartSeriesShape>(seriesGetter: () => readonly S[], options: UseChartSeriesSetupOptions<S> = {}): UseChartSeriesSetupReturn {
    const legendContext = useContext(FluxStatisticsChartLegendInjectionKey);
    const t = useFluxTranslate();
    const series = seriesGetter();
    const palette = useMemo(() => series.map((item, index) => resolveChartColor(item.color) ?? CHART_DEFAULT_COLORS[index % CHART_DEFAULT_COLORS.length]), [series]);
    const items = useMemo(() => series.flatMap((item, index) => {
        const result = options.getLegendItem?.(item, palette[index], index, t) ?? {color: palette[index], icon: item.icon, label: item.name ? t(String(item.name)) : ''};
        return Array.isArray(result) ? result : [result as ChartLegendItem];
    }), [series, palette, options.getLegendItem, t]);
    const setItems = legendContext?.setItems;
    useEffect(() => setItems?.(items), [setItems, items]);
    const [chartInstance, setChartInstance] = useState<EChartsInstance | null>(null);
    const chartRef = useCallback((handle: {chartInstance: EChartsInstance | null} | null) => setChartInstance(handle?.chartInstance ?? null), []);
    useChartHoverSync(chartInstance, legendContext, {mode: options.mode});
    return {t, palette, legendContext, chartInstance, chartRef};
}
export interface UseChartSlicesSetupReturn extends UseChartSeriesSetupReturn {
    readonly tooltipItems: readonly SharedTooltipItem[];
}
export function useChartSlicesSetup(slicesGetter: () => readonly FluxStatisticsChartPieSlice[]): UseChartSlicesSetupReturn {
    const slices = slicesGetter();
    const series = useMemo(() => slices.map(slice => ({...slice, name: slice.label})), [slices]);
    const setup = useChartSeriesSetup(() => series, {mode: 'data', getLegendItem: sliceLegendItem});
    const tooltipItems = useMemo(() => slices.map((item, index) => ({name: item.label, value: item.formatted ?? item.value, color: setup.palette[index], icon: item.icon, dataIndex: index, seriesIndex: 0})), [slices, setup.palette]);
    return {...setup, tooltipItems};
}
function sliceLegendItem(slice: FluxStatisticsChartPieSlice, color: string, _index: number, t: Translator): ChartLegendItem {
    return {color, icon: slice.icon, label: slice.label ? t(String(slice.label)) : '', value: slice.formatted ?? slice.value};
}
