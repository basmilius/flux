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

The date filter lets users pick a single date, honoring the configured minimum and maximum. It writes the selection to the filter state automatically.

::: render
render=../../code/filter/components/date/preview.vue
:::

::: warning
This component can only be used within a [Filter](./filter).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/filter/components/date/snippet.vue [FilterDate.vue]

:::

## Used components

- [Date picker](../../components/date-picker)
