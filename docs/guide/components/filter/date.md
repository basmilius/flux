---
outline: deep

props:
    -   name: icon
        description: The icon of the filter.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label of the filter.
        type: string

    -   name: max
        description: The maximum date that can be selected.
        type: DateTime
        optional: true

    -   name: min
        description: The minimum date that can be selected.
        type: DateTime
        optional: true

    -   name: name
        description: The name of the filter within the filter state.
        type: string
---

# Filter date

This component provides a date-filtering functionality, allowing users to select a single date while ensuring compatibility with defined minimum and maximum constraints. It handles state updates automatically.

::: render
render=../../../code/guide/components/filter/date/preview.vue
:::

::: warning
This component can only be used within a [Filter](./index).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/filter/date/snippet.vue [FilterDate.vue]

:::

## Used components

- [Date picker](../date-picker)
