# Chart colors

Flux Statistics provides two pre-defined color palettes for use in charts.

## CHART_COLORS

A set of four CSS custom properties designed for themed chart colors. These colors adapt to the current theme.

```ts
import { CHART_COLORS } from '@flux-ui/statistics';

// ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']
```

## CHART_COLORFUL_COLORS

A vibrant palette of 17 colors spanning the full spectrum. These are fixed hex color values from the Flux color system.

```ts
import { CHART_COLORFUL_COLORS } from '@flux-ui/statistics';

// [red500, orange500, amber500, yellow500, lime500, green500, emerald500,
//  teal500, cyan500, sky500, blue500, indigo500, violet500, purple500,
//  fuchsia500, pink500, rose50]
```

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
