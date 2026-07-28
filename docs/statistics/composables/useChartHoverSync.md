# useChartHoverSync

Keeps a chart and the [Legend](../components/legend/) around it pointing at the same thing. It listens for `mouseover` and `mouseout` on the ECharts instance and writes the result into the legend's `hoveredIndex`, and it dispatches `highlight` and `downplay` back onto the chart when the hover comes from the legend instead.

The listeners are re-attached whenever the instance changes and removed before the component unmounts.

## Usage

```ts
import { useChartHoverSync } from '@flux-ui/statistics';

useChartHoverSync(chartInstance, legendContext, {mode: 'series'});
```

Both setup composables call it for you, so use it directly only in a chart of your own:

- `mode: 'series'` maps a legend entry onto one series, for a chart with several lines or bars.
- `mode: 'data'` maps a legend entry onto one data point of a single series, for a pie or donut chart.

::: tip
The composable returns early when `legendContext` is `null`, so a chart outside a [Legend scope](../components/legend-scope) can call it unconditionally.
:::

## Type declarations

```ts
import type { Ref } from 'vue';

declare function useChartHoverSync(
    chartInstance: Ref<EChartsInstance | null>,
    legendContext: ChartLegendContext | null,
    options: UseChartHoverSyncOptions
): void;

type ChartHoverSyncMode = 'series' | 'data';

type UseChartHoverSyncOptions = {
    readonly mode: ChartHoverSyncMode;
    readonly seriesIndex?: number;
};
```

## Used by

- [Charts](../components/charts/)
- [Legend scope](../components/legend-scope)
