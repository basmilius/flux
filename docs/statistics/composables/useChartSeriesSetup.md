# useChartSeriesSetup

Everything a series based chart needs in one call: the translator, the resolved color palette, the legend context and the ECharts instance of the chart it wraps. It also publishes a legend entry per series and wires up [`useChartHoverSync`](./useChartHoverSync), so hovering a line highlights its legend entry and the other way around.

The instance is read from a template ref named `chartRef`, which is what every chart in this package names its underlying [`FluxStatisticsChart`](../components/charts/).

## Usage

```ts
import { useChartSeriesSetup } from '@flux-ui/statistics';

const props = defineProps<{
    readonly series: readonly FluxStatisticsChartSeries[];
}>();

const {t, palette, legendContext, chartInstance} = useChartSeriesSetup(() => props.series);
```

A color is resolved per series: the series' own `color` when it has one, otherwise the next entry of the default chart palette, wrapping around when there are more series than colors.

## Options

### mode (`'series'`)
How a legend entry maps onto the chart, passed straight to [`useChartHoverSync`](./useChartHoverSync).

### getLegendItem
Builds the legend entry for a series. Return an array to publish more than one entry for a single series. The default entry carries the series' color, its icon and its translated name.

## Type declarations

```ts
import type { FluxIconName, FluxStatisticsChartColor } from '@flux-ui/types';
import type { ComputedRef } from 'vue';

declare function useChartSeriesSetup<S extends ChartSeriesShape>(
    seriesGetter: () => readonly S[],
    options?: UseChartSeriesSetupOptions<S>
): UseChartSeriesSetupReturn;

type ChartSeriesShape = {
    readonly name?: string;
    readonly icon?: FluxIconName;
    readonly color?: FluxStatisticsChartColor;
};

type ChartLegendItemBuilder<S> = (
    series: S,
    color: string,
    index: number,
    t: Translator
) => ChartLegendItem | readonly ChartLegendItem[];

type UseChartSeriesSetupOptions<S extends ChartSeriesShape> = {
    readonly mode?: ChartHoverSyncMode;
    readonly getLegendItem?: ChartLegendItemBuilder<S>;
};

type UseChartSeriesSetupReturn = {
    readonly t: Translator;
    readonly palette: ComputedRef<readonly string[]>;
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
};
```

## Used by

- [Charts](../components/charts/)
