# useECharts

Mounts an [Apache ECharts](https://echarts.apache.org) instance on an element and keeps it alive: it applies the option when the element mounts, replaces it whenever the option changes, resizes the chart when the element does, and disposes the instance when the component unmounts.

Every chart in this package is built on it. Reach for it directly when you need a chart type Flux Statistics does not ship.

## Usage

```ts
import { useECharts } from '@flux-ui/statistics';
import { computed, ref } from 'vue';

const target = ref<HTMLElement | null>(null);

const {chartInstance, resize} = useECharts(target, computed(() => ({
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed']},
    yAxis: {type: 'value'},
    series: [{type: 'bar', data: [120, 200, 150]}]
})));
```

::: warning
Options are applied with `notMerge`, so every update replaces the option in full. Build the whole option in one computed rather than patching parts of it.
:::

::: tip
Resizing is already handled through a `ResizeObserver`, throttled to one animation frame. Call `resize()` yourself only when the element changes size without its box changing, for example when it becomes visible again.
:::

## Type declarations

```ts
import type { EChartsCoreOption, init } from 'echarts/core';
import type { MaybeRefOrGetter, Ref } from 'vue';

declare function useECharts(
    target: Ref<HTMLElement | null>,
    options: MaybeRefOrGetter<EChartsOption>
): UseEChartsReturn;

type EChartsOption = EChartsCoreOption;
type EChartsInstance = ReturnType<typeof init>;

type UseEChartsReturn = {
    readonly chartInstance: Ref<EChartsInstance | null>;

    resize(): void;
};
```

## Used by

- [Charts](../components/charts/)
- [Sparkline](../components/sparkline)
