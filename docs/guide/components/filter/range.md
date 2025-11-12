---
outline: deep

props:
    -   name: icon
        description: The icon of the filter.
        type: FluxIconName
        optional: true

    -   name: is-ticks-visible
        description: Indicates if the slider ticks should be visible.
        type: boolean
        optional: true

    -   name: label
        description: The label of the filter.
        type: string

    -   name: name
        description: The name of the filter within the filter state.
        type: string

    -   name: max
        description: The maximum value.
        type: number

    -   name: min
        description: The minimum value.
        type: number

    -   name: step
        description: The step value.
        type: number
        optional: true
        default: 1

    -   name: formatter
        description: A formatter that is used to format the slider values into something more human readable.
        type: "(value: number) => string"
        optional: true
---

# Filter range

This component provides an option select functionality, allowing users to select multiple options from a set of predefined options. It handles state updates automatically.

::: render
render=../../../code/guide/components/filter/range/preview.vue
:::

::: warning
This component can only be used within a [Filter](./index).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/guide/components/filter/range/snippet.vue [FilterRange.vue]

:::

## Used components

- [Form](../form)
    - [Column](../form/column)
    - [Field](../form/field)
    - [Slider](../form/slider)
