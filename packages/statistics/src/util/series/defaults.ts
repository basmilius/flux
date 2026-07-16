import type { BarSeriesOption, BoxplotSeriesOption, CandlestickSeriesOption, GaugeSeriesOption, HeatmapSeriesOption, LineSeriesOption, PieSeriesOption, RadarSeriesOption, ScatterSeriesOption, TreemapSeriesOption } from 'echarts/charts';
import { CHART_FONT_FAMILY, CHART_TEXT_2XSMALL, CHART_TEXT_XSMALL } from '../typography';

const SOFT_EMPHASIS = {focus: 'none'} as const;
const PIE_EMPHASIS = {focus: 'none', scale: true, scaleSize: 6} as const;
const NO_EMPHASIS = {disabled: true} as const;
const PIE_SLICE_BORDER = {borderColor: 'var(--surface)', borderWidth: 2};

const stagger = (step: number) => (idx: number) => idx * step;

export const LINE_SERIES_DEFAULTS: Partial<LineSeriesOption> = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    emphasis: SOFT_EMPHASIS
};

export const AREA_SERIES_DEFAULTS: Partial<LineSeriesOption> = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    areaStyle: {opacity: 0.25},
    lineStyle: {width: 2},
    emphasis: SOFT_EMPHASIS
};

export const BAR_SERIES_DEFAULTS: Partial<BarSeriesOption> = {
    type: 'bar',
    itemStyle: {borderRadius: 6},
    barCategoryGap: '25%',
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(40),
    animationDelayUpdate: stagger(20)
};

export const PIE_SERIES_DEFAULTS: Partial<PieSeriesOption> = {
    type: 'pie',
    radius: '75%',
    label: {show: false},
    itemStyle: {...PIE_SLICE_BORDER, borderRadius: 6},
    selectedMode: false,
    emphasis: PIE_EMPHASIS
};

export const DONUT_SERIES_DEFAULTS: Partial<PieSeriesOption> = {
    type: 'pie',
    radius: ['55%', '75%'],
    padAngle: 1,
    label: {show: false},
    itemStyle: {...PIE_SLICE_BORDER, borderRadius: 6},
    selectedMode: false,
    emphasis: PIE_EMPHASIS
};

export const POLAR_AREA_SERIES_DEFAULTS: Partial<PieSeriesOption> = {
    type: 'pie',
    roseType: 'area',
    radius: ['10%', '75%'],
    padAngle: 1,
    label: {show: false},
    itemStyle: {...PIE_SLICE_BORDER, opacity: 0.85, borderRadius: 6},
    selectedMode: false,
    emphasis: PIE_EMPHASIS
};

export const RADAR_SERIES_DEFAULTS: Partial<RadarSeriesOption> = {
    type: 'radar',
    areaStyle: {opacity: 0.25},
    lineStyle: {width: 2.5},
    symbolSize: 6,
    emphasis: SOFT_EMPHASIS
};

export const HEATMAP_SERIES_DEFAULTS: Partial<HeatmapSeriesOption> = {
    type: 'heatmap',
    itemStyle: {
        borderColor: 'var(--surface)',
        borderWidth: 2,
        borderRadius: 6
    },
    label: {show: false},
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(8),
    animationDelayUpdate: stagger(4)
};

export const SCATTER_SERIES_DEFAULTS: Partial<ScatterSeriesOption> = {
    type: 'scatter',
    symbolSize: 14,
    itemStyle: {
        borderColor: 'var(--surface)',
        borderWidth: 2,
        opacity: 0.9
    },
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(25),
    animationDelayUpdate: stagger(15)
};

export const BUBBLE_SERIES_DEFAULTS: Partial<ScatterSeriesOption> = {
    type: 'scatter',
    itemStyle: {
        borderColor: 'var(--surface)',
        borderWidth: 2,
        opacity: 0.65
    },
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(25),
    animationDelayUpdate: stagger(15)
};

export const BOXPLOT_SERIES_DEFAULTS: Partial<BoxplotSeriesOption> = {
    type: 'boxplot',
    itemStyle: {
        color: 'var(--chart-1)',
        borderColor: 'var(--foreground-prominent)',
        borderWidth: 1
    },
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(60),
    animationDelayUpdate: stagger(30)
};

export const CANDLESTICK_SERIES_DEFAULTS: Partial<CandlestickSeriesOption> = {
    type: 'candlestick',
    itemStyle: {
        color: 'var(--success-500)',
        color0: 'var(--danger-500)',
        borderColor: 'var(--success-500)',
        borderColor0: 'var(--danger-500)'
    },
    emphasis: SOFT_EMPHASIS,
    animationDelay: stagger(30),
    animationDelayUpdate: stagger(15)
};

export const TREEMAP_SERIES_DEFAULTS: Partial<TreemapSeriesOption> = {
    type: 'treemap',
    roam: false,
    nodeClick: false,
    breadcrumb: {show: false},
    itemStyle: {
        borderColor: 'var(--surface)',
        borderWidth: 3,
        borderRadius: 6,
        gapWidth: 0
    },
    label: {
        show: true,
        color: 'var(--white)',
        ...CHART_TEXT_XSMALL,
        fontWeight: 600
    },
    emphasis: SOFT_EMPHASIS
};

export const GAUGE_SERIES_DEFAULTS: Partial<GaugeSeriesOption> = {
    type: 'gauge',
    startAngle: 225,
    endAngle: -45,
    min: 0,
    max: 100,
    radius: '90%',
    emphasis: NO_EMPHASIS,
    progress: {
        show: true,
        width: 14,
        roundCap: true
    },
    axisLine: {
        lineStyle: {
            width: 14,
            color: [[1, 'var(--gray-100)']]
        },
        roundCap: true
    },
    axisTick: {show: false},
    splitLine: {show: false},
    axisLabel: {show: false},
    pointer: {show: false},
    anchor: {show: false},
    title: {
        show: true,
        color: 'var(--foreground-secondary)',
        ...CHART_TEXT_2XSMALL,
        fontWeight: 500,
        offsetCenter: [0, '-30%']
    },
    detail: {
        show: true,
        color: 'var(--foreground-prominent)',
        fontSize: 28,
        fontWeight: 800,
        fontFamily: CHART_FONT_FAMILY,
        offsetCenter: [0, '10%'],
        formatter: '{value}%'
    }
};
