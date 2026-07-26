# Chart colors

A chart has a colour problem of its own. A button needs to stand out against the surface behind it, but a series needs to stay apart from the other series as well, and it has to keep doing that when the theme flips. Flux Statistics therefore has its own token layer on top of the [design tokens](../../guide/introduction/design-tokens), plus one fixed palette for charts that need more categories than the themed set covers.

## Chart tokens

Every token is declared once and takes its own value per theme, the same way the rest of Flux works.

| Token | What it is |
|---|---|
| `--chart-1` … `--chart-8` | The series colors, ordered by prominence |
| `--chart-positive` | Growth, gain, an upward change |
| `--chart-negative` | Loss, decline, a downward change |
| `--chart-grid` | Axis and grid lines |
| `--chart-label` | Axis labels, ticks and legend text |

The order of the eight is the order in which to spend them. `--chart-1` carries the most contrast against the chart surface and each next one steps down, so a two-series chart separates without anyone picking colors by hand, and an eight-series chart still separates at the bottom of the list.

Both themes get their own values instead of a mirrored scale. A series colour has to hold its contrast against the chart surface it is actually drawn on, and in dark mode that is not the same problem as in light.

## CHART_COLORS

The default cycle, in the order a chart assigns them to series that carry no `color` of their own.

```ts
import { CHART_COLORS } from '@flux-ui/statistics';

// ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']
```

## CHART_COLORFUL_COLORS

A vibrant palette of 17 colors spanning the full spectrum.

```ts
import { CHART_COLORFUL_COLORS } from '@flux-ui/statistics';

// [red500, orange500, amber500, yellow500, lime500, green500, emerald500,
//  teal500, cyan500, sky500, blue500, indigo500, violet500, purple500,
//  fuchsia500, pink500, rose500]
```

These are fixed hex values from the [color palette](../../internals/data/color) in `@flux-ui/internals`, not design tokens. They stay the same in both themes and they are not held to a contrast target, so reach for them when a chart has more categories than the themed set covers and the categories matter more than the theme does.

## Usage

```vue
<template>
    <FluxStatisticsBarChart
        :data="chartData"
        :colors="CHART_COLORFUL_COLORS"/>
</template>

<script
    setup
    lang="ts">
    import { CHART_COLORFUL_COLORS } from '@flux-ui/statistics';
</script>
```
