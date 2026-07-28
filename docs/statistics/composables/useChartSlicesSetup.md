# useChartSlicesSetup

The counterpart of [`useChartSeriesSetup`](./useChartSeriesSetup) for charts made of slices rather than series: [Pie](../components/charts/pie), [Donut](../components/charts/donut) and [Polar area](../components/charts/polar-area). It resolves a color per slice, builds the shared tooltip items and the legend entries, and syncs hovering in `data` mode, since every slice is one data point of a single series.

The instance is read from a template ref named `chartRef`.

## Usage

```ts
import { useChartSlicesSetup } from '@flux-ui/statistics';

const props = defineProps<{
    readonly slices: readonly FluxStatisticsChartPieSlice[];
}>();

const {t, palette, tooltipItems, legendContext, chartInstance} = useChartSlicesSetup(() => props.slices);
```

A slice that carries a `formatted` value shows that string in the tooltip and the legend; without one the raw `value` is used.

## Type declarations

```ts
import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
import type { ComputedRef } from 'vue';

declare function useChartSlicesSetup(
    slicesGetter: () => readonly FluxStatisticsChartPieSlice[]
): UseChartSlicesSetupReturn;

type UseChartSlicesSetupReturn = {
    readonly t: Translator;
    readonly palette: ComputedRef<readonly string[]>;
    readonly tooltipItems: ComputedRef<readonly SharedTooltipItem[]>;
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
};
```

## Used by

- [Donut chart](../components/charts/donut)
- [Pie chart](../components/charts/pie)
- [Polar area chart](../components/charts/polar-area)
