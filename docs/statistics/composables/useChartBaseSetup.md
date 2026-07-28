# useChartBaseSetup

Returns the translator every chart uses to resolve series, slice and axis names against the configured locale. It is the smallest common denominator of the chart setup composables: [`useChartSeriesSetup`](./useChartSeriesSetup) and [`useChartSlicesSetup`](./useChartSlicesSetup) return the same translator alongside their own state.

Use it in a chart that has neither series nor slices to sync, such as a heatmap or a treemap.

## Usage

```ts
import { useChartBaseSetup } from '@flux-ui/statistics';

const {t} = useChartBaseSetup();

const label = t('statistics.revenue');
```

## Type declarations

```ts
declare function useChartBaseSetup(): UseChartBaseSetupReturn;

type UseChartBaseSetupReturn = {
    readonly t: Translator;
};

type Translator = (key: string) => string;
```

## Used by

- [Heatmap chart](../components/charts/heatmap)
- [Treemap chart](../components/charts/treemap)
