---
outline: deep

requiredIcons:
    - circle-info

props:
    -   name: title
        description: The title shown in the header of the widget.
        type: string
        optional: true

    -   name: icon
        description: An icon shown at the trailing end of the header.
        type: FluxIconName
        optional: true

    -   name: is-loading
        description: Puts the underlying pane in its loading state and marks the widget as busy for assistive technology.
        type: boolean
        optional: true

    -   name: is-small
        description: Renders a compact header, for a widget that sits next to other small parts.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The body of the widget. It is wrapped in a padded column, which is what most widgets want.

    -   name: content
        description: The body of the widget without any padding around it, for content that has to run edge to edge.

    -   name: info
        description: Explanatory text shown in a tooltip behind an info icon in the header.
---

# Base

`FluxStatisticsBase` is the pane every other widget in this package is built on: a [Pane](../../components/pane/) with an optional header carrying a title, an info tooltip and an icon. Reach for it whenever you need a widget of your own that sits next to a [KPI](./kpi) or a [Metric](./metric) and reads as part of the same set.

::: render
render=../../code/statistics/components/base/preview.vue
:::

::: tip
Place it in a [Grid](./grid) to line it up with the other widgets on a dashboard.
:::

<FrontmatterDocs/>

## Examples

::: example Small || `is-small` shrinks the header, for a widget that has to carry less weight than the ones around it.
example=../../code/statistics/components/base/small.vue
:::

::: example Edge to edge || The `content` slot skips the padded column, for a table or a chart that should touch the sides of the pane.
example=../../code/statistics/components/base/content.vue
:::

::: example Loading || `is-loading` covers the widget while its data is on its way.
example=../../code/statistics/components/base/loading.vue
:::

## Used components

- [Icon](../../components/icon)
- [Pane](../../components/pane/)
- [Tooltip](../../components/tooltip)
