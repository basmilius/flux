---
outline: deep

props:
    -   name: color
        description: The color of the change indicator.
        type: FluxColor
        optional: true

    -   name: icon
        description: The icon shown at the start of the change indicator.
        type: FluxIconName
        optional: true

    -   name: value
        description: The value shown in the change indicator, typically a percentage or formatted number.
        type: [ string, number ]
---

# Change

The change component displays a value indicator — typically used to show a trend or delta compared to a previous period. It supports a color and optional icon to convey direction at a glance.

::: render
render=../../code/statistics/components/change/preview.vue
:::

::: tip
This component is best used inside a [KPI](./kpi) or [Metric](./metric) via the `change` prop.
:::

<FrontmatterDocs/>

## Used components

- [Icon](../../guide/components/icon)
