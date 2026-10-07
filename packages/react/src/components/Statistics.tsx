import {useFluxTranslate} from '../i18n';
import {merge} from 'lodash-es';
import { clsx } from 'clsx';
import { createContext, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { FluxColor, FluxDirection, FluxIconName, FluxStatisticsChangeData as StatisticsChange, FluxStatisticsChartAreaSeries, FluxStatisticsChartBarSeries, FluxStatisticsChartBoxPlotSeries, FluxStatisticsChartBubbleSeries, FluxStatisticsChartCandlestickSeries, FluxStatisticsChartGaugeSeries, FluxStatisticsChartHeatmapSeries, FluxStatisticsChartLineSeries, FluxStatisticsChartMixedSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries, FluxStatisticsChartScatterSeries, FluxStatisticsChartTreemapNode, FluxStatisticsPercentageBarItemObject, FluxStyle } from '../types';
import { FluxBoxedIcon } from './DisplayExtended';
import { FluxPane } from './Display';
import { FluxIcon } from './Icon';
import { FluxToolbar } from './Composition';
import { CHART_DEFAULT_COLORS, FluxStatisticsChartLegendInjectionKey, FluxStatisticsLegendVariantInjectionKey, buildAreaChartOptions, buildBarChartOptions, buildBoxPlotChartOptions, buildBubbleChartOptions, buildCandlestickChartOptions, buildDonutChartOptions, buildGaugeChartOptions, buildHeatmapChartOptions, buildLineChartOptions, buildMixedChartOptions, buildPieChartOptions, buildPolarAreaChartOptions, buildRadarChartOptions, buildScatterChartOptions, buildSparklineOptions, buildTreemapChartOptions, resolveChartColor, useECharts, useChartSeriesSetup, useChartSlicesSetup, candlestickLegendItemBuilder, gaugeLegendItemBuilder } from './StatisticsUtilities';
import {buildBaseOptions} from './StatisticsUtilities';
import type { ChartLegendContext, ChartLegendItem, ChartTooltipValueFormatter, EChartsInstance, EChartsOption, FluxStatisticsLegendVariant, SparklineSeriesItem, SparklineVariant, ChartSeriesShape, ChartLegendItemBuilder } from './StatisticsUtilities';
import baseStyles from '../../../statistics/src/css/Base.module.scss';
import changeStyles from '../../../statistics/src/css/Change.module.scss';
import chartStyles from '../../../statistics/src/css/Chart.module.scss';
import chartPaneStyles from '../../../statistics/src/css/ChartPane.module.scss';
import comparisonStyles from '../../../statistics/src/css/Comparison.module.scss';
import detailsStyles from '../../../statistics/src/css/DetailsTable.module.scss';
import emptyStyles from '../../../statistics/src/css/Empty.module.scss';
import gridStyles from '../../../statistics/src/css/Grid.module.scss';
import kpiStyles from '../../../statistics/src/css/Kpi.module.scss';
import legendStyles from '../../../statistics/src/css/Legend.module.scss';
import meterStyles from '../../../statistics/src/css/Meter.module.scss';
import metricStyles from '../../../statistics/src/css/Metric.module.scss';
import percentageStyles from '../../../statistics/src/css/PercentageBar.module.scss';
import sparklineStyles from '../../../statistics/src/css/Sparkline.module.scss';
import trackerStyles from '../../../statistics/src/css/Tracker.module.scss';
import trackerCardStyles from '../../../statistics/src/css/TrackerCard.module.scss';

export interface FluxStatisticsChartHandle {
    readonly chartInstance: EChartsInstance | null;
    resize(): void;
}
export const FluxStatisticsChart = forwardRef<FluxStatisticsChartHandle, HTMLAttributes<HTMLDivElement> & { options?: EChartsOption }>(function FluxStatisticsChart({ className, options = {}, ...props }, forwardedRef) {
    const mergedOptions = useMemo(() => {
        const merged = merge({}, buildBaseOptions(), options);
        if (options.color !== undefined) merged.color = options.color;
        if (options.series !== undefined) merged.series = options.series;
        return merged;
    }, [options]);
    const element = useRef<HTMLDivElement>(null),
        chart = useECharts(element, mergedOptions);
    useImperativeHandle(forwardedRef, () => ({ chartInstance: chart.chartInstance, resize: chart.resize }), [chart.chartInstance]);
    return <div {...props} ref={element} className={clsx(chartStyles.statisticsChart, className)} />;
});

interface CartesianChartProps<S> extends HTMLAttributes<HTMLDivElement> {
    advancedOptions?: EChartsOption;
    labels?: readonly string[];
    series: readonly S[];
    splitLines?: boolean;
    tooltip?: boolean;
    tooltipValueFormatter?: ChartTooltipValueFormatter;
    xAxisLabels?: boolean;
    yAxisLabels?: boolean;
}
function useCartesianChart<S>(props: CartesianChartProps<S>) {
    const { advancedOptions, labels, series, splitLines, tooltip, tooltipValueFormatter, xAxisLabels, yAxisLabels, ...domProps } = props;
    const chart = useMemo(() => ({ advancedOptions, labels, series, splitLines, tooltip, tooltipValueFormatter, xAxisLabels, yAxisLabels }), [advancedOptions, labels, series, splitLines, tooltip, tooltipValueFormatter, xAxisLabels, yAxisLabels]);
    return {chart, domProps};
}
function useCartesianOptions<S extends ChartSeriesShape>(chart: CartesianChartProps<S>, build: (props: CartesianChartProps<S> & {palette: readonly string[]; t: (key: string) => string; styles: typeof chartStyles}) => EChartsOption, getLegendItem?: ChartLegendItemBuilder<S>) {
    const {t, palette, chartRef} = useChartSeriesSetup(() => chart.series, {getLegendItem});
    const options = useMemo(() => build({...chart, palette, t, styles: chartStyles}), [build, chart, palette, t]);
    return {options, chartRef};
}
export function FluxStatisticsLineChart(props: CartesianChartProps<FluxStatisticsChartLineSeries>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildLineChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsAreaChart(props: CartesianChartProps<FluxStatisticsChartAreaSeries>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildAreaChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsBarChart(props: CartesianChartProps<FluxStatisticsChartBarSeries>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildBarChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsMixedChart(props: CartesianChartProps<FluxStatisticsChartMixedSeries>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildMixedChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsScatterChart(props: Omit<CartesianChartProps<FluxStatisticsChartScatterSeries>, 'labels'>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildScatterChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsBubbleChart(props: Omit<CartesianChartProps<FluxStatisticsChartBubbleSeries>, 'labels'>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildBubbleChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsBoxPlotChart(props: Omit<CartesianChartProps<FluxStatisticsChartBoxPlotSeries>, 'tooltipValueFormatter'>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildBoxPlotChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsCandlestickChart(props: Omit<CartesianChartProps<FluxStatisticsChartCandlestickSeries>, 'tooltipValueFormatter'>) {
    const {chart, domProps} = useCartesianChart(props), {options, chartRef} = useCartesianOptions(chart, buildCandlestickChartOptions, candlestickLegendItemBuilder); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
interface SliceChartProps extends HTMLAttributes<HTMLDivElement> {
    advancedOptions?: EChartsOption;
    slices: readonly FluxStatisticsChartPieSlice[];
    title?: string;
    tooltip?: boolean;
    tooltipValueFormatter?: ChartTooltipValueFormatter;
}
function useSliceChart(props: SliceChartProps) {const {advancedOptions, slices, title, tooltip, tooltipValueFormatter, ...domProps} = props; const chart = useMemo(() => ({advancedOptions, slices, title, tooltip, tooltipValueFormatter}), [advancedOptions, slices, title, tooltip, tooltipValueFormatter]); return {chart, domProps};}
function useSliceOptions(chart: SliceChartProps, build: (props: SliceChartProps & ReturnType<typeof useChartSlicesSetup> & {styles: typeof chartStyles}) => EChartsOption) {
    const setup = useChartSlicesSetup(() => chart.slices);
    const {t, palette, tooltipItems, chartRef} = setup;
    const options = useMemo(() => build({...chart, ...setup, styles: chartStyles}), [build, chart, t, palette, tooltipItems]);
    return {options, chartRef};
}
export function FluxStatisticsPieChart(props: SliceChartProps) {
    const {chart, domProps} = useSliceChart(props), {options, chartRef} = useSliceOptions(chart, buildPieChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsDonutChart(props: SliceChartProps) {
    const {chart, domProps} = useSliceChart(props), {options, chartRef} = useSliceOptions(chart, buildDonutChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsPolarAreaChart(props: SliceChartProps) {
    const {chart, domProps} = useSliceChart(props), {options, chartRef} = useSliceOptions(chart, buildPolarAreaChartOptions); return <FluxStatisticsChart ref={chartRef} {...domProps} options={options} />;
}
export function FluxStatisticsRadarChart({ advancedOptions, indicators, series, tooltip, ...props }: HTMLAttributes<HTMLDivElement> & { advancedOptions?: EChartsOption; indicators: readonly FluxStatisticsChartRadarIndicator[]; series: readonly FluxStatisticsChartRadarSeries[]; tooltip?: boolean }) {
    const {t, palette, chartRef} = useChartSeriesSetup(() => series, {mode: 'data'});
    const options = useMemo(() => buildRadarChartOptions({ advancedOptions, indicators, series, tooltip, palette, t, styles: chartStyles }), [advancedOptions, indicators, series, tooltip, palette, t]);
    return <FluxStatisticsChart ref={chartRef} {...props} options={options} />;
}
export function FluxStatisticsRadialBar({ advancedOptions, series, tooltip, ...props }: HTMLAttributes<HTMLDivElement> & { advancedOptions?: EChartsOption; series: readonly FluxStatisticsChartGaugeSeries[]; tooltip?: boolean }) {
    const {t, palette, chartRef} = useChartSeriesSetup(() => series, {getLegendItem: gaugeLegendItemBuilder});
    const options = useMemo(() => buildGaugeChartOptions({ advancedOptions, series, tooltip, palette, t, styles: chartStyles }), [advancedOptions, series, tooltip, palette, t]);
    return <FluxStatisticsChart ref={chartRef} {...props} options={options} />;
}
export function FluxStatisticsHeatmapChart({ advancedOptions, series, tooltip, xAxisLabels, xLabels = [], yAxisLabels, yLabels = [], ...props }: HTMLAttributes<HTMLDivElement> & { advancedOptions?: EChartsOption; series: readonly FluxStatisticsChartHeatmapSeries[]; tooltip?: boolean; xAxisLabels?: boolean; xLabels?: readonly string[]; yAxisLabels?: boolean; yLabels?: readonly string[] }) {
    const t = useFluxTranslate();
    const options = useMemo(() => buildHeatmapChartOptions({ advancedOptions, series, tooltip, xAxisLabels, xLabels, yAxisLabels, yLabels, t, styles: chartStyles }), [advancedOptions, series, tooltip, xAxisLabels, xLabels, yAxisLabels, yLabels, t]);
    return <FluxStatisticsChart {...props} options={options} />;
}
export function FluxStatisticsTreemapChart({ advancedOptions, nodes, tooltip, ...props }: HTMLAttributes<HTMLDivElement> & { advancedOptions?: EChartsOption; nodes: readonly FluxStatisticsChartTreemapNode[]; tooltip?: boolean }) {
    const t = useFluxTranslate();
    const options = useMemo(() => buildTreemapChartOptions({ advancedOptions, nodes, tooltip, t, styles: chartStyles }), [advancedOptions, nodes, tooltip, t]);
    return <FluxStatisticsChart {...props} options={options} />;
}
export function FluxStatisticsSparkline({ className, color, options, series, variant = 'line', ...props }: HTMLAttributes<HTMLDivElement> & { color?: FluxColor | `#${string}`; options?: EChartsOption; series: readonly SparklineSeriesItem[]; variant?: SparklineVariant }) {
    const resolved = resolveChartColor(color) ?? CHART_DEFAULT_COLORS[0], built = useMemo(() => buildSparklineOptions(variant, resolved, series), [resolved, series, variant]), merged = useMemo(() => ({...built, ...options, series: options?.series ?? built.series}), [built, options]);
    return <FluxStatisticsChart {...props} className={clsx(sparklineStyles.statisticsSparkline, className)} options={merged} />;
}

export function FluxStatisticsBase({ children, className, content, icon, info, isLoading, isSmall, title, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'content'> & { content?: ReactNode; icon?: FluxIconName; info?: ReactNode; isLoading?: boolean; isSmall?: boolean; title?: string }) {
    return (
        <FluxPane {...props} aria-busy={isLoading || undefined} className={clsx(isSmall ? baseStyles.statisticsBaseSmall : baseStyles.statisticsBase, className)} isLoading={isLoading}>
            {(title || icon || info) && (
                <div className={baseStyles.statisticsBaseHeader}>
                    {title && <span className={baseStyles.statisticsBaseHeaderTitle}>{title}</span>}
                    {info && (
                        <span className={baseStyles.statisticsBaseHeaderInfo} title={typeof info === 'string' ? info : undefined}>
                            <FluxIcon name="circle-info" />
                            {typeof info === 'string' ? null : info}
                        </span>
                    )}
                    {icon && <FluxIcon className={baseStyles.statisticsBaseHeaderIcon} name={icon} />}
                </div>
            )}
            {children && <div className={baseStyles.statisticsBaseContent}>{children}</div>}
            {content}
        </FluxPane>
    );
}
export interface FluxStatisticsChange {
    readonly color?: FluxColor;
    readonly icon?: FluxIconName;
    readonly value: string | number;
}
export function FluxStatisticsChange({ color, icon, value }: FluxStatisticsChange) {
    return (
        <div className={clsx(changeStyles.statisticsChange, color && changeStyles[`is${capitalize(color)}`])} role="presentation">
            {icon && <FluxIcon className={changeStyles.statisticsChangeIcon} name={icon} />}
            <span className={changeStyles.statisticsChangeValue}>{value}</span>
        </div>
    );
}
export function FluxStatisticsKpi({ change, footer, icon, isLoading, title, value }: { change?: StatisticsChange; footer?: string; icon?: FluxIconName; isLoading?: boolean; title: string; value: string | number }) {
    return (
        <FluxStatisticsBase isLoading={isLoading} isSmall icon={icon} title={title}>
            <div className={kpiStyles.statisticsKpiValue}>{value}</div>
            {(change || footer) && (
                <div className={kpiStyles.statisticsKpiBottom}>
                    {change && <FluxStatisticsChange {...change} />}
                    {footer && <span className={kpiStyles.statisticsKpiFooter}>{footer}</span>}
                </div>
            )}
        </FluxStatisticsBase>
    );
}
export function FluxStatisticsMetric({ change, children, footer, icon, isLoading, label, title, value }: { change?: StatisticsChange; children?: ReactNode; footer?: string; icon?: FluxIconName; isLoading?: boolean; label?: string; title: string; value?: string | number }) {
    return (
        <FluxStatisticsBase isLoading={isLoading} icon={icon} title={title}>
            {label && <div className={metricStyles.statisticsMetricLabel}>{label}</div>}
            {value !== undefined && <div className={metricStyles.statisticsMetricValue}>{value}</div>}
            {children && <div className={metricStyles.statisticsMetricContent}>{children}</div>}
            {(change || footer) && (
                <div className={metricStyles.statisticsMetricBottom}>
                    {change && <FluxStatisticsChange {...change} />}
                    {footer && <span className={metricStyles.statisticsMetricFooter}>{footer}</span>}
                </div>
            )}
        </FluxStatisticsBase>
    );
}
export function FluxStatisticsComparison({ current, currentLabel = 'Current', footer, format, icon, previous, previousLabel, showDelta = true, title }: { current: number; currentLabel?: string; footer?: string; format?: (value: number) => string; icon?: FluxIconName; previous: number; previousLabel?: string; showDelta?: boolean; title: string }) {
    const translate = useFluxTranslate();
    previousLabel ??= translate('flux.previous');

    const delta = previous === 0 ? 0 : ((current - previous) / Math.abs(previous)) * 100,
        rounded = Math.round(delta * 10) / 10,
        color: FluxColor = rounded > 0 ? 'success' : rounded < 0 ? 'danger' : 'gray',
        iconName = rounded > 0 ? 'arrow-trend-up' : rounded < 0 ? 'arrow-trend-down' : undefined,
        formatted = previous === 0 && current !== 0 ? '—' : `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}%`;
    return (
        <FluxStatisticsBase isSmall icon={icon} title={title}>
            <div className={comparisonStyles.statisticsComparison}>
                <div className={comparisonStyles.statisticsComparisonItem}>
                    <div className={comparisonStyles.statisticsComparisonItemLabel}>{currentLabel}</div>
                    <div className={comparisonStyles.statisticsComparisonItemValue}>{format?.(current) ?? current}</div>
                </div>
                <div className={comparisonStyles.statisticsComparisonDivider} />
                <div className={comparisonStyles.statisticsComparisonItem}>
                    <div className={comparisonStyles.statisticsComparisonItemLabel}>{previousLabel}</div>
                    <div className={comparisonStyles.statisticsComparisonItemValueMuted}>{format?.(previous) ?? previous}</div>
                </div>
            </div>
            {showDelta && (
                <div className={comparisonStyles.statisticsComparisonBottom}>
                    <FluxStatisticsChange color={color} icon={iconName} value={formatted} />
                    {footer && <span className={comparisonStyles.statisticsComparisonFooter}>{footer}</span>}
                </div>
            )}
        </FluxStatisticsBase>
    );
}
export function FluxStatisticsGrid({ children, gap, lg, md, sm, xl, xs, style, ...props }: HTMLAttributes<HTMLDivElement> & { gap?: number; xs?: number; sm?: number; md?: number; lg?: number; xl?: number }) {
    return (
        <div {...props} className={clsx(gridStyles.statisticsGrid, props.className)} style={{ ...style, '--gap': gap ? `${gap}px` : undefined, '--xs': xs ?? 1, '--sm': sm ?? xs ?? 1, '--md': md ?? sm ?? xs ?? 2, '--lg': lg ?? md ?? sm ?? xs ?? 3, '--xl': xl ?? lg ?? md ?? sm ?? xs ?? 4 } as FluxStyle}>
            <div className={gridStyles.statisticsGridContent}>{children}</div>
        </div>
    );
}
export function FluxStatisticsEmpty({ children, description, icon, title }: { children?: ReactNode; description?: string; icon?: FluxIconName; title?: string }) {
    return (
        <div className={emptyStyles.statisticsEmpty}>
            {icon && <FluxIcon className={emptyStyles.statisticsEmptyIcon} name={icon} />}
            {title && <div className={emptyStyles.statisticsEmptyTitle}>{title}</div>}
            {description && <div className={emptyStyles.statisticsEmptyDescription}>{description}</div>}
            {children && <div className={emptyStyles.statisticsEmptyActions}>{children}</div>}
        </div>
    );
}
export function FluxStatisticsChartPane({ aspectRatio, children, icon, info, isLoading, legend, maxHeight, minHeight, title, toolbar }: { aspectRatio?: number; children?: ReactNode; icon?: FluxIconName; info?: ReactNode; isLoading?: boolean; legend?: ReactNode; maxHeight?: number; minHeight?: number; title?: string; toolbar?: ReactNode }) {
    return (
        <FluxStatisticsBase
            className={chartPaneStyles.statisticsChartPane}
            isLoading={isLoading}
            icon={icon}
            info={info}
            title={title}
            style={{ '--aspect-ratio': aspectRatio, '--max-height': maxHeight ? `${maxHeight}px` : undefined, '--min-height': minHeight ? `${minHeight}px` : undefined } as FluxStyle}
            content={
                <FluxStatisticsLegendScope>
                    <div className={chartPaneStyles.statisticsChartPaneBody}>
                        <div className={chartPaneStyles.statisticsChartPaneContainer}>{children}</div>
                        {legend}
                    </div>
                    {toolbar && <FluxToolbar>{toolbar}</FluxToolbar>}
                </FluxStatisticsLegendScope>
            }
        />
    );
}
export function FluxStatisticsDetailsTable({ children, title }: { children?: ReactNode; title: string }) {
    return (
        <div role="table" aria-label={title} className={detailsStyles.detailsTable}>
            <div role="caption" className={detailsStyles.detailsTableTitle}>
                {title}
            </div>
            <div role="rowgroup" className={detailsStyles.detailsTableRows}>
                {children}
            </div>
        </div>
    );
}
export function FluxStatisticsDetailsTableRow({ label, value }: { label: string; value: string }) {
    return (
        <div role="row" className={detailsStyles.detailsTableRow}>
            <span role="rowheader" className={detailsStyles.detailsTableRowLabel}>
                {label}
            </span>
            <span role="cell" className={detailsStyles.detailsTableRowValue}>
                {value}
            </span>
        </div>
    );
}

export function FluxStatisticsLegendScope({ children }: { children?: ReactNode }) {
    const [items, setItems] = useState<readonly ChartLegendItem[]>([]),
        [hoveredIndex, setHoveredIndex] = useState<number | null>(null),
        setLegendItems = useCallback((next: readonly ChartLegendItem[]) => setItems((previous) => (previous.length === next.length && previous.every((item, index) => item.color === next[index].color && item.icon === next[index].icon && item.label === next[index].label && item.value === next[index].value && item.seriesIndex === next[index].seriesIndex) ? previous : next)), []),
        context = useMemo<ChartLegendContext>(() => ({ items, hoveredIndex, setItems: setLegendItems, setHoveredIndex }), [items, hoveredIndex, setLegendItems]);
    return <FluxStatisticsChartLegendInjectionKey.Provider value={context}>{children}</FluxStatisticsChartLegendInjectionKey.Provider>;
}
export function FluxStatisticsLegend({ children, direction = 'horizontal', items, variant = 'detailed' }: { children?: ReactNode; direction?: FluxDirection; items?: readonly ChartLegendItem[]; variant?: FluxStatisticsLegendVariant }) {
    const context = useContext(FluxStatisticsChartLegendInjectionKey),
        values = items ?? context?.items ?? [];
    return (
        <FluxStatisticsLegendVariantInjectionKey.Provider value={variant}>
            <div role="list" className={variant === 'compact' ? clsx(legendStyles.statisticsLegendCompact, direction === 'vertical' ? legendStyles.isVertical : legendStyles.isHorizontal) : legendStyles.statisticsLegend}>
                {children ?? values.map((item, index) => <FluxStatisticsLegendItem key={`${index}-${item.label}`} {...item} isHovered={context?.hoveredIndex === index} onMouseEnter={() => context?.setHoveredIndex(index)} onMouseLeave={() => context?.setHoveredIndex(null)} onFocus={() => context?.setHoveredIndex(index)} onBlur={() => context?.setHoveredIndex(null)} />)}
            </div>
        </FluxStatisticsLegendVariantInjectionKey.Provider>
    );
}
export function FluxStatisticsLegendItem({ color, icon, isHovered, label, value, ...props }: HTMLAttributes<HTMLButtonElement> & { color?: FluxColor | `#${string}` | string; icon?: FluxIconName; isHovered?: boolean; label: string; value?: string | number }) {
    const variant = useContext(FluxStatisticsLegendVariantInjectionKey);
    return (
        <button {...props} type="button" role="listitem" className={clsx(variant === 'compact' ? legendStyles.statisticsLegendItemCompact : legendStyles.statisticsLegendItem, variant !== 'compact' && isHovered && legendStyles.isHovered, props.className)} style={{ ...props.style, '--color': resolveChartColor(color as never) } as FluxStyle}>
            {icon ? <FluxIcon className={legendStyles.statisticsLegendItemIcon} name={icon} size={16} /> : <div className={legendStyles.statisticsLegendItemColor} />}
            {label && <span className={legendStyles.statisticsLegendItemLabel}>{label}</span>}
            {value !== undefined && <span className={legendStyles.statisticsLegendItemValue}>{value}</span>}
        </button>
    );
}
const percentage = (value: number) => new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 1 }).format(value);
export function FluxStatisticsPercentageBar({ items }: { items: FluxStatisticsPercentageBarItemObject[] }) {
    const context = useContext(FluxStatisticsChartLegendInjectionKey),
        normalized = items.map((item) => ({ ...item, value: Math.max(0, item.value) }));
    useEffect(() => context?.setItems(items.map((item) => ({ color: resolveChartColor(item.color), icon: item.icon, label: item.label, value: item.displayValue }))), [context, items]);
    return (
        <div role="img" aria-label={normalized.map((item) => `${percentage(item.value)} ${item.label}`).join(', ')} className={percentageStyles.statisticsPercentageBar}>
            <div className={clsx(percentageStyles.statisticsPercentageBarTrack, context && context.hoveredIndex !== null && percentageStyles.isHoverActive)}>
                {normalized.map((item, index) => (
                    <div key={item.label} title={`${percentage(item.value)} ${item.label}`} className={clsx(percentageStyles.statisticsPercentageBarSegment, context?.hoveredIndex === index && percentageStyles.isHovered)} style={{ backgroundColor: resolveChartColor(item.color), flexGrow: item.value }} onMouseEnter={() => context?.setHoveredIndex(index)} onMouseLeave={() => context?.setHoveredIndex(null)} />
                ))}
            </div>
        </div>
    );
}
export function FluxStatisticsMeter({ color, footer, icon, isSmall, subTitle, tip, title, value, variant = 'bar', className, style: customStyle, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & { color?: string; icon?: FluxIconName; isSmall?: boolean; footer?: string; subTitle?: string; tip?: string; title?: string; value: number; variant?: 'bar' | 'blocks' }) {
    const blocks = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState(0);
    useLayoutEffect(() => {
        if (!blocks.current || typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(entries => setTrackWidth(entries[0].contentRect.width));
        observer.observe(blocks.current);
        return () => observer.disconnect();
    }, [variant]);
    const count = Math.max(1, Math.floor((trackWidth + 3) / 9)),
        filled = Math.max(0, Math.min(count, Math.round(value * count))),
        style = { '--color': resolveChartColor(color as never), '--percentage': `${value * 100}%` } as FluxStyle;
    return (
        <div {...props} className={clsx(isSmall ? meterStyles.statisticsMeterSmall : meterStyles.statisticsMeter, className)} style={{...style, ...customStyle}}>
            <div className={meterStyles.statisticsMeterHeader}>
                {icon && <FluxIcon className={meterStyles.statisticsMeterHeaderIcon} name={icon} size={16} />}
                {title && <span className={meterStyles.statisticsMeterHeaderTitle}>{title}</span>}
                {subTitle && <span className={meterStyles.statisticsMeterHeaderSubTitle}>{subTitle}</span>}
                <span className={meterStyles.statisticsMeterHeaderValue}>{percentage(value)}</span>
                {tip && <span className={meterStyles.statisticsMeterHeaderTip}>{tip}</span>}
            </div>
            {variant === 'blocks' ? (
                <div ref={blocks} className={meterStyles.statisticsMeterBlocks}>
                    {Array.from({ length: count }, (_, index) => (
                        <div key={index} className={clsx(meterStyles.statisticsMeterBlock, index < filled && meterStyles.isFilled)} />
                    ))}
                </div>
            ) : (
                <div className={meterStyles.statisticsMeterBar}>
                    <div className={meterStyles.statisticsMeterBarValue} />
                </div>
            )}
            {footer && <div className={meterStyles.statisticsMeterFooter}>{footer}</div>}
        </div>
    );
}

export type ElementRef = React.RefObject<HTMLElement | null>;
export interface TrackerContext {
    registerMarker(element: HTMLElement | null): () => void;
    registerGroup?(): TrackerGroupContext;
}
export interface TrackerGroupContext {
    registerStep(element: HTMLElement | null): () => void;
}
export const FluxStatisticsTrackerInjectionKey = createContext<TrackerContext | null>(null),
    FluxStatisticsTrackerGroupInjectionKey = createContext<TrackerGroupContext | null>(null);
export function useTracker(root: React.RefObject<HTMLElement | null>) {
    const [markers, setMarkers] = useState<HTMLElement[]>([]),
        [geometryVersion, setGeometryVersion] = useState(0),
        registerMarker = useCallback((element: HTMLElement | null) => {
            if (element) setMarkers((items) => (items.includes(element) ? items : [...items, element]));
            return () => {
                if (element) setMarkers((items) => items.filter((item) => item !== element));
            };
        }, []),
        registerGroup = useCallback(() => ({ registerStep: registerMarker, dispose() {} }), [registerMarker]),
        linePath = useMemo(() => {
            const rootRect = root.current?.getBoundingClientRect();
            if (!rootRect || markers.length < 2) return '';
            return markers
                .map((element, index) => {
                    const rect = element.getBoundingClientRect();
                    return `${index ? 'L' : 'M'} ${rect.left + rect.width / 2 - rootRect.left} ${rect.top + rect.height / 2 - rootRect.top}`;
                })
                .join(' ');
        }, [geometryVersion, markers, root]);
    useLayoutEffect(() => {
        if (typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(() => setGeometryVersion((version) => version + 1));
        if (root.current) observer.observe(root.current);
        markers.forEach((marker) => observer.observe(marker));
        return () => observer.disconnect();
    }, [markers, root]);
    return { dashPath: '', linePath, registerMarker, registerGroup };
}
export function FluxStatisticsTracker({ children }: { children?: ReactNode }) {
    const root = useRef<HTMLDivElement>(null),
        tracker = useTracker(root),
        context = useMemo<TrackerContext>(() => ({ registerMarker: tracker.registerMarker, registerGroup: tracker.registerGroup }), [tracker.registerMarker, tracker.registerGroup]);
    return (
        <FluxStatisticsTrackerInjectionKey.Provider value={context}>
            <div ref={root} className={trackerStyles.tracker} role="list">
                {tracker.linePath && (
                    <svg className={trackerStyles.trackerLine} aria-hidden="true">
                        <path d={tracker.linePath} />
                    </svg>
                )}
                {children}
            </div>
        </FluxStatisticsTrackerInjectionKey.Provider>
    );
}
const TRACKER_COLORS: Record<FluxColor, string> = { gray: trackerStyles.trackerEntryGray, primary: trackerStyles.trackerEntryPrimary, danger: trackerStyles.trackerEntryDanger, info: trackerStyles.trackerEntryInfo, success: trackerStyles.trackerEntrySuccess, warning: trackerStyles.trackerEntryWarning };
export function FluxStatisticsTrackerEntry({ children, color = 'gray', description, end, icon, start, title, when }: { children?: ReactNode; color?: FluxColor; description?: string; end?: ReactNode; icon?: FluxIconName; start?: ReactNode; title?: string; when?: string }) {
    const tracker = useContext(FluxStatisticsTrackerInjectionKey),
        marker = useRef<HTMLElement>(null);
    useLayoutEffect(() => tracker?.registerMarker(marker.current), [tracker]);
    return (
        <div className={TRACKER_COLORS[color]} role="listitem">
            {icon ? (
                <div ref={marker as React.RefObject<HTMLDivElement>} className={trackerStyles.trackerEntryMarker}>
                    <FluxIcon name={icon} size={20} />
                </div>
            ) : (
                <span ref={marker as React.RefObject<HTMLSpanElement>} className={trackerStyles.trackerEntryDot} />
            )}
            <div className={trackerStyles.trackerEntryBody}>
                {(title || description || when || start || end) && (
                    <div className={trackerStyles.trackerEntryHeader}>
                        <div className={trackerStyles.trackerEntryHeading}>
                            {start}
                            {title && <strong className={trackerStyles.trackerEntryTitle}>{title}</strong>}
                            {description && <span className={trackerStyles.trackerEntryDescription}>{description}</span>}
                            {end}
                        </div>
                        {when && <span className={trackerStyles.trackerEntryWhen}>{when}</span>}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
export function FluxStatisticsTrackerLabel({ color = 'gray', end, label }: { color?: FluxColor; end?: ReactNode; label: string }) {
    const tracker = useContext(FluxStatisticsTrackerInjectionKey),
        marker = useRef<HTMLSpanElement>(null);
    useLayoutEffect(() => tracker?.registerMarker(marker.current), [tracker]);
    return (
        <div className={trackerStyles[`trackerLabel${capitalize(color)}`]} role="listitem">
            <span ref={marker} className={trackerStyles.trackerLabelDot} />
            <span className={trackerStyles.trackerLabelText}>{label}</span>
            {end}
        </div>
    );
}
export function FluxStatisticsTrackerSteps({ children }: { children?: ReactNode }) {
    const tracker = useContext(FluxStatisticsTrackerInjectionKey),
        group = useMemo(() => tracker?.registerGroup?.() ?? null, [tracker]);
    return (
        <FluxStatisticsTrackerGroupInjectionKey.Provider value={group}>
            <div className={trackerStyles.trackerSteps} role="list">
                {children}
            </div>
        </FluxStatisticsTrackerGroupInjectionKey.Provider>
    );
}
export function FluxStatisticsTrackerStep({ children, end, label, state = 'pending' }: { children?: ReactNode; end?: ReactNode; label?: string; state?: 'active' | 'done' | 'pending' }) {
    const group = useContext(FluxStatisticsTrackerGroupInjectionKey),
        marker = useRef<HTMLSpanElement>(null);
    useLayoutEffect(() => group?.registerStep(marker.current), [group]);
    return (
        <div className={state === 'active' ? trackerStyles.trackerStepActive : state === 'done' ? trackerStyles.trackerStepDone : trackerStyles.trackerStep} role="listitem">
            <span ref={marker} className={trackerStyles.trackerStepMarker}>
                {state === 'done' ? <FluxIcon name="circle-check" size={16} /> : <span className={trackerStyles.trackerStepDot} />}
            </span>
            <span className={trackerStyles.trackerStepLabel}>{children ?? label}</span>
            {end}
        </div>
    );
}
export function FluxStatisticsTrackerCard({ children, color = 'primary', end, icon, labels = 'bottom', start, subtitle, title }: { children?: ReactNode; color?: FluxColor; end?: ReactNode; icon?: FluxIconName; labels?: 'bottom' | 'top'; start?: ReactNode; subtitle?: string; title: string }) {
    return (
        <FluxPane className={trackerCardStyles.trackerCard}>
            <div className={trackerCardStyles.trackerCardHeader}>
                {start}
                <div className={trackerCardStyles.trackerCardHeaderText}>
                    <span className={trackerCardStyles.trackerCardTitle}>{title}</span>
                    {subtitle && <span className={trackerCardStyles.trackerCardSubtitle}>{subtitle}</span>}
                </div>
                {end ?? (icon && <FluxBoxedIcon color={color} name={icon} />)}
            </div>
            <div className={labels === 'top' ? trackerCardStyles.trackerCardLabelsTop : trackerCardStyles.trackerCardSegments} role="list">
                {children}
            </div>
        </FluxPane>
    );
}
export function FluxStatisticsTrackerCardSegment({ color, label, max = 100, min = 0, state = 'todo', value = 50 }: { color?: string; label?: string; max?: number; min?: number; state?: 'active' | 'done' | 'todo'; value?: number }) {
    const progress = max <= min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min)));
    return (
        <div className={trackerCardStyles.trackerCardSegment} role="listitem" aria-label={label} aria-current={state === 'active' ? 'step' : undefined}>
            <span className={clsx(trackerCardStyles.trackerCardSegmentBar, state === 'active' && trackerCardStyles.isActive, state === 'done' && trackerCardStyles.isDone)} style={{ '--color': resolveChartColor(color as never), '--progress': `${progress * 100}%` } as FluxStyle} />
            {label && <span className={trackerCardStyles.trackerCardSegmentLabel}>{label}</span>}
        </div>
    );
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
export * from './StatisticsUtilities';
