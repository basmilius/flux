---
outline: deep

props:
    -   name: title
        description: The title of the empty state.
        type: string
        optional: true

    -   name: description
        description: A short description explaining why the chart is empty.
        type: string
        optional: true

    -   name: icon
        description: An icon shown above the title.
        type: FluxIconName
        optional: true

slots:
    -   name: default
        description: Slot for action buttons or links.
---

# Empty

The empty widget provides a placeholder to display inside a [Chart pane](./chart-pane) or [Base](./grid) when there is no data to visualize. It supports an icon, title, description, and a default slot for action elements.

::: render
render=../../code/statistics/components/empty/preview.vue
:::

::: tip
Use this component to replace a chart whenever the data source returns an empty result, instead of rendering an empty chart.
:::

<FrontmatterDocs/>

## Examples

::: example With action || An empty state that includes a primary action button.
example=../../code/statistics/components/empty/with-action.vue
:::

::: example Custom icon || An empty state with a topic-specific icon.
example=../../code/statistics/components/empty/custom-icon.vue
:::

::: example Inside a chart pane || An empty state placed inside a chart pane to replace a missing chart.
example=../../code/statistics/components/empty/in-chart-pane.vue
:::
