# useChartLegend

The contract between a chart and the [Legend](../components/legend/) around it. A [Legend scope](../components/legend-scope) creates the context with `createChartLegendContext` and provides it under `FluxStatisticsChartLegendInjectionKey`; the chart inside fills `items` with what it drew, and both sides write to `hoveredIndex` to highlight the same series or slice.

There is no `useChartLegend` function: charts pick the context up through [`useChartSeriesSetup`](./useChartSeriesSetup) or [`useChartSlicesSetup`](./useChartSlicesSetup), which handle the wiring for you.

## Usage

```ts
import { createChartLegendContext, FluxStatisticsChartLegendInjectionKey } from '@flux-ui/statistics';
import { provide } from 'vue';

const legend = createChartLegendContext();

provide(FluxStatisticsChartLegendInjectionKey, legend);
```

Reading it from the other side:

```ts
import { FluxStatisticsChartLegendInjectionKey } from '@flux-ui/statistics';
import { inject } from 'vue';

const legend = inject(FluxStatisticsChartLegendInjectionKey, null);

// legend?.items.value    the entries the chart published
// legend?.hoveredIndex   the entry both sides highlight
```

::: tip
The context is optional everywhere. A chart without a legend scope around it injects `null` and simply skips the sync, so nothing has to change to use a chart on its own.
:::

## Type declarations

```ts
import type { FluxIconName } from '@flux-ui/types';
import type { InjectionKey, Ref } from 'vue';

declare function createChartLegendContext(): ChartLegendContext;

declare const FluxStatisticsChartLegendInjectionKey: InjectionKey<ChartLegendContext>;

type ChartLegendItem = {
    readonly color?: string;
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly seriesIndex?: number;
    readonly value?: string | number;
};

type ChartLegendContext = {
    readonly items: Ref<readonly ChartLegendItem[]>;
    readonly hoveredIndex: Ref<number | null>;
};
```

## Used by

- [Legend](../components/legend/)
- [Legend scope](../components/legend-scope)
