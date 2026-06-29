---
outline: deep

props:
    -   name: label
        description: The label of the legend item.
        type: string

    -   name: color
        description: The color swatch of the legend item. Accepts a FluxColor or a custom hex color.
        type: [ 'FluxColor', '`#${string}`' ]
        optional: true

    -   name: icon
        description: An icon shown instead of the color swatch.
        type: FluxIconName
        optional: true

    -   name: value
        description: An optional value shown to the right of the label.
        type: [ string, number ]
        optional: true
---

# Legend item

A single entry in a [Legend](./index), consisting of a color swatch or icon, a label, and an optional value.

::: render
render=../../../code/statistics/components/legend/item/preview.vue
:::

::: tip
This component is best used within a [Legend](./index).
:::

::: info
The item exposes the ARIA `listitem` role and is keyboard focusable. Within a [Legend](./index) it is reached through the legend's single tab stop and arrow-key navigation — its tab order is managed automatically, so you do not set `tabindex` yourself. Focusing an item triggers the same hover synchronization as the mouse, highlighting the matching series in the linked visualization.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/statistics/components/legend/item/preview.vue [FluxStatisticsLegendItem.vue]

:::

## Used components

- [Icon](../../../components/icon)
