---
outline: deep

props:
    -   name: variant
        description: The visual style of the legend. `detailed` is the default chart legend; `compact` renders a condensed color dot and label, optionally with an icon and value.
        type: [ detailed, compact ]
        optional: true
        default: detailed

    -   name: direction
        description: The direction of the legend items. Only applies to the `compact` variant.
        type: [ horizontal, vertical ]
        optional: true
        default: horizontal

slots:
    -   name: default
        description: The legend items.
---

# Legend

The statistics legend groups [Legend items](./item) together, providing a visual key that maps colors or icons to the data series displayed in a chart.

::: render
render=../../../code/statistics/components/legend/preview.vue
:::

::: tip
This component is best used within a [Chart pane](../chart-pane) via the `legend` slot.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A legend with two series using a color swatch.
example=../../../code/statistics/components/legend/basic.vue
:::

::: example With values || Legend items that include a percentage value alongside the label.
example=../../../code/statistics/components/legend/with-values.vue
:::

::: example With icons || Set the `icon` prop to replace the color swatch with an icon.
example=../../../code/statistics/components/legend/with-icons.vue
:::

::: example Mixed || Color swatches and icons can be combined within a single legend.
example=../../../code/statistics/components/legend/mixed.vue
:::

::: example Compact || The `compact` variant renders a condensed color dot and label, ideal for use outside of a chart.
example=../../../code/statistics/components/legend/compact.vue
:::

::: example Compact vertical || Set `direction` to `vertical` to stack a compact legend.
example=../../../code/statistics/components/legend/compact-vertical.vue
:::

::: example Compact with icons || The compact variant also supports icons and values.
example=../../../code/statistics/components/legend/compact-icons.vue
:::

## Used components

- [Item](./item)
