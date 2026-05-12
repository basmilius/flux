---
outline: deep

props:
    -   name: series
        description: The OHLC data series. Each data point must contain `x` (date) and `y` as `[open, high, low, close]`.
        type: ApexOptions['series']

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ApexCharts options to merge with the defaults.
        type: ApexOptions
        optional: true
---

# Candlestick chart

The candlestick chart renders OHLC (open, high, low, close) data points using a green-on-success / red-on-danger color scheme. It is purpose-built for financial price data, but works equally well for any range-over-time series.

::: render
render=../../../code/statistics/components/charts/candlestick/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example OHLC || A typical candlestick chart with daily OHLC values.
example=../../../code/statistics/components/charts/candlestick/ohlc.vue
:::

::: example Short range || A short-range candlestick chart for intraday data.
example=../../../code/statistics/components/charts/candlestick/short-range.vue
:::

::: example Volatile || A candlestick chart showing a more volatile price series.
example=../../../code/statistics/components/charts/candlestick/volatile.vue
:::
