# Chart types

Flux Statistics exposes a set of library-agnostic TypeScript types in `@flux-ui/types`. Each chart component accepts data shaped to its own Flux type rather than ECharts options, which lets the visual layer change underneath without touching consumer code.

This page lists every public type with a short description and a minimal example.

## Shared types

### `FluxStatisticsChartColor`

A color specifier accepted by every series, slice, and node. Use one of the named Flux colors (resolved against the active theme) or any hex value.

```ts
type FluxStatisticsChartColor = FluxColor | `#${string}`;
// FluxColor = 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'
```

```ts
const themed: FluxStatisticsChartColor = 'success';   // var(--success-600)
const branded: FluxStatisticsChartColor = '#10b981';  // raw hex
```

### `FluxStatisticsChartCategoryPoint`

A data point that carries its own X-axis label. Cartesian charts accept either bare numbers or category points.

```ts
interface FluxStatisticsChartCategoryPoint {
    readonly label?: string;
    readonly value: number;
}
```

```ts
const dataA: number[] = [12, 24, 18, 32];

const dataB: FluxStatisticsChartCategoryPoint[] = [
    { label: 'Q1', value: 12 },
    { label: 'Q2', value: 24 },
    { label: 'Q3', value: 18 },
    { label: 'Q4', value: 32 }
];
```

## Cartesian series

Used by [Line](../components/charts/line), [Area](../components/charts/area), and [Bar](../components/charts/bar) charts. The three series types are aliases of the same shape; each chart applies its own visual defaults.

### `FluxStatisticsChartCartesianSeries`

```ts
interface FluxStatisticsChartCartesianSeries {
    readonly name?: string;
    readonly data: readonly (number | FluxStatisticsChartCategoryPoint)[];
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}

type FluxStatisticsChartLineSeries = FluxStatisticsChartCartesianSeries;
type FluxStatisticsChartAreaSeries = FluxStatisticsChartCartesianSeries;
type FluxStatisticsChartBarSeries  = FluxStatisticsChartCartesianSeries;
```

```ts
import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';

const series: FluxStatisticsChartLineSeries[] = [
    {
        name: 'Revenue',
        color: 'success',
        icon: 'money-bill',
        data: [4200, 5800, 6400, 7100, 7900, 8800]
    },
    {
        name: 'Costs',
        color: 'danger',
        data: [3100, 3400, 3600, 3900, 4200, 4500]
    }
];
```

When a series has an `icon`, the auto-legend and the shared tooltip both render it.

## Mixed series

Used by the [Mixed chart](../components/charts/mixed) to combine line, area, and bar series in one plot.

### `FluxStatisticsChartMixedSeries`

```ts
interface FluxStatisticsChartMixedSeries extends FluxStatisticsChartCartesianSeries {
    readonly type: 'line' | 'area' | 'bar';
}
```

```ts
import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';

const series: FluxStatisticsChartMixedSeries[] = [
    { name: 'Revenue', type: 'bar', data: [42, 58, 64, 71] },
    { name: 'Forecast', type: 'area', data: [40, 56, 66, 74] },
    { name: 'Orders', type: 'line', data: [12, 18, 22, 26] }
];
```

## Pie family slices

Used by the [Pie](../components/charts/pie), [Donut](../components/charts/donut), and [Polar area](../components/charts/polar-area) charts. All three accept a `slices` prop instead of `series`.

### `FluxStatisticsChartPieSlice`

```ts
interface FluxStatisticsChartPieSlice {
    readonly label: string;
    readonly value: number;
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

const slices: FluxStatisticsChartPieSlice[] = [
    { label: 'Active', value: 68, color: 'success', icon: 'circle-check' },
    { label: 'Trialing', value: 22, color: 'info', icon: 'hourglass-clock' },
    { label: 'Churned', value: 10, color: 'danger', icon: 'circle-xmark' }
];
```

## Radar series

Used by the [Radar chart](../components/charts/radar). Each series is one ring with one value per indicator. Indicators are passed separately via the `indicators` prop.

### `FluxStatisticsChartRadarSeries`

```ts
interface FluxStatisticsChartRadarSeries {
    readonly name?: string;
    readonly values: readonly number[];
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

### `FluxStatisticsChartRadarIndicator`

```ts
interface FluxStatisticsChartRadarIndicator {
    readonly name: string;
    readonly max?: number;
}
```

```ts
import type {
    FluxStatisticsChartRadarIndicator,
    FluxStatisticsChartRadarSeries
} from '@flux-ui/types';

const indicators: FluxStatisticsChartRadarIndicator[] = [
    { name: 'Speed', max: 100 },
    { name: 'Quality', max: 100 },
    { name: 'Accuracy', max: 100 },
    { name: 'Focus', max: 100 }
];

const series: FluxStatisticsChartRadarSeries[] = [
    { name: 'Q1', values: [82, 65, 73, 91] },
    { name: 'Q2', values: [70, 60, 64, 80] }
];
```

The order of `values` must match the order of `indicators`.

## Scatter series

Used by the [Scatter chart](../components/charts/scatter). Each point is an `{x, y}` coordinate on a 2D plane.

### `FluxStatisticsChartScatterPoint`

```ts
interface FluxStatisticsChartScatterPoint {
    readonly x: number;
    readonly y: number;
}
```

### `FluxStatisticsChartScatterSeries`

```ts
interface FluxStatisticsChartScatterSeries {
    readonly name?: string;
    readonly data: readonly FluxStatisticsChartScatterPoint[];
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';

const series: FluxStatisticsChartScatterSeries[] = [{
    name: 'Products',
    data: [
        { x: 15, y: 3.2 }, { x: 28, y: 3.9 }, { x: 42, y: 4.3 }, { x: 68, y: 4.6 }
    ]
}];
```

## Bubble series

Used by the [Bubble chart](../components/charts/bubble). Extends a scatter point with a third numeric dimension `size`, encoded as the bubble radius.

### `FluxStatisticsChartBubblePoint`

```ts
interface FluxStatisticsChartBubblePoint extends FluxStatisticsChartScatterPoint {
    readonly size: number;
}
```

### `FluxStatisticsChartBubbleSeries`

```ts
interface FluxStatisticsChartBubbleSeries {
    readonly name?: string;
    readonly data: readonly FluxStatisticsChartBubblePoint[];
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';

const series: FluxStatisticsChartBubbleSeries[] = [{
    name: 'Market cap',
    data: [
        { x: 12, y: 8, size: 24 },
        { x: 22, y: 14, size: 18 },
        { x: 32, y: 26, size: 12 },
        { x: 42, y: 18, size: 30 }
    ]
}];
```

## Candlestick series

Used by the [Candlestick chart](../components/charts/candlestick). Each point holds named OHLC values plus an optional X-axis label. `positiveColor` and `negativeColor` override the default success/danger colors.

### `FluxStatisticsChartCandlestickPoint`

```ts
interface FluxStatisticsChartCandlestickPoint {
    readonly label?: string;
    readonly open: number;
    readonly close: number;
    readonly low: number;
    readonly high: number;
}
```

### `FluxStatisticsChartCandlestickSeries`

```ts
interface FluxStatisticsChartCandlestickSeries {
    readonly name?: string;
    readonly data: readonly FluxStatisticsChartCandlestickPoint[];
    readonly positiveColor?: FluxStatisticsChartColor;
    readonly negativeColor?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';

const series: FluxStatisticsChartCandlestickSeries[] = [{
    name: 'Price',
    data: [
        { label: '2026-01-01', open: 102, close: 105, low: 100, high: 108 },
        { label: '2026-01-02', open: 105, close: 109, low: 103, high: 110 },
        { label: '2026-01-03', open: 109, close: 107, low: 106, high: 112 }
    ]
}];
```

## Box plot series

Used by the [Box plot chart](../components/charts/box-plot). Each point is a five-number summary (min, Q1, median, Q3, max).

### `FluxStatisticsChartBoxPlotPoint`

```ts
interface FluxStatisticsChartBoxPlotPoint {
    readonly label?: string;
    readonly min: number;
    readonly q1: number;
    readonly median: number;
    readonly q3: number;
    readonly max: number;
}
```

### `FluxStatisticsChartBoxPlotSeries`

```ts
interface FluxStatisticsChartBoxPlotSeries {
    readonly name?: string;
    readonly data: readonly FluxStatisticsChartBoxPlotPoint[];
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';

const series: FluxStatisticsChartBoxPlotSeries[] = [{
    name: 'Latency',
    data: [
        { label: 'API', min: 54, q1: 66, median: 82, q3: 88, max: 120 },
        { label: 'DB',  min: 22, q1: 30, median: 38, q3: 44, max: 60 }
    ]
}];
```

## Heatmap series

Used by the [Heatmap chart](../components/charts/heatmap). Each point holds named `x`, `y`, and `value` fields. `x` and `y` are either numeric indices or strings matching the `xLabels`/`yLabels` props.

### `FluxStatisticsChartHeatmapPoint`

```ts
interface FluxStatisticsChartHeatmapPoint {
    readonly x: string | number;
    readonly y: string | number;
    readonly value: number;
}
```

### `FluxStatisticsChartHeatmapSeries`

```ts
interface FluxStatisticsChartHeatmapSeries {
    readonly name?: string;
    readonly data: readonly FluxStatisticsChartHeatmapPoint[];
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';

const days = ['Mon', 'Tue', 'Wed'];
const weeks = ['W1', 'W2', 'W3', 'W4'];

const series: FluxStatisticsChartHeatmapSeries[] = [{
    data: days.flatMap(day =>
        weeks.map(week => ({ x: week, y: day, value: Math.round(Math.random() * 100) }))
    )
}];
```

## Treemap nodes

Used by the [Treemap chart](../components/charts/treemap). Nodes are recursive. Pass the root level via the `nodes` prop and nest deeper levels through `children`.

### `FluxStatisticsChartTreemapNode`

```ts
interface FluxStatisticsChartTreemapNode {
    readonly name: string;
    readonly value?: number;
    readonly color?: FluxStatisticsChartColor;
    readonly children?: readonly FluxStatisticsChartTreemapNode[];
}
```

```ts
import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';

const nodes: FluxStatisticsChartTreemapNode[] = [
    {
        name: 'Media',
        value: 1800,
        color: 'primary',
        children: [
            { name: 'Photos', value: 1100 },
            { name: 'Videos', value: 600 }
        ]
    },
    {
        name: 'Documents',
        value: 540,
        color: 'info'
    }
];
```

## Gauge series

Used by the [Radial bar chart](../components/charts/radial-bar). Each entry produces a concentric gauge ring. `radius` is optional. The chart spreads rings automatically when omitted.

### `FluxStatisticsChartGaugeSeries`

```ts
interface FluxStatisticsChartGaugeSeries {
    readonly name: string;
    readonly value: number;
    readonly radius?: number;
    readonly color?: FluxStatisticsChartColor;
    readonly icon?: FluxIconName;
}
```

```ts
import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';

const series: FluxStatisticsChartGaugeSeries[] = [
    { name: 'API', value: 94, color: 'success', icon: 'server' },
    { name: 'Database', value: 82, color: 'info', icon: 'database' },
    { name: 'Storage', value: 68, color: 'warning', icon: 'hard-drive' }
];
```

## Escape-hatch: `advancedOptions`

Every chart component exposes an optional `advancedOptions: EChartsOption` prop. The Flux types cover the common cases. When you need something the typed surface doesn't expose (a custom `visualMap`, a non-standard `axisPointer`, a swapped axis), reach for `advancedOptions`. The object is deep-merged on top of the Flux defaults, while series and palette overrides always win.

```vue
<template>
    <FluxStatisticsBarChart
        :advanced-options="advancedOptions"
        :series="series"/>
</template>

<script setup lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';
    import { FluxStatisticsBarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartBarSeries[] = [{
        name: 'Orders',
        data: [4200, 3100, 1800, 1500]
    }];

    const advancedOptions: EChartsOption = {
        xAxis: {
            type: 'value',
            axisLabel: { color: 'var(--foreground-secondary)' }
        },
        yAxis: {
            type: 'category',
            data: ['NL', 'DE', 'BE', 'FR']
        }
    };
</script>
```

::: tip
Treat `advancedOptions` as the exception, not the rule. Anything you can express with the Flux types stays portable if the underlying chart library is ever swapped out.
:::

## Color resolution

When a `color` is set on a series, slice, or node, Flux resolves it as follows:

| Input | Resolved to |
|---|---|
| `'primary'` (any `FluxColor`) | `var(--primary-600)` |
| `'#10b981'` (any hex) | `'#10b981'` |
| omitted | next color from `CHART_COLORS` (see [Chart colors](./colors)) |

The same color flows into the rendered chart, the [Legend](../components/legend/) (whether manual or auto-generated), and the tooltip, so series stay visually consistent across all three surfaces.
