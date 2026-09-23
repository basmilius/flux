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
        default: formatNumber
---

# Filter range

The range filter constrains a data set to a numeric range with a pair of sliders, one for the lower bound and one for the upper. It writes the selected range to the filter state automatically.

::: render
render=../../code/filter/components/range/preview.vue
:::

::: warning
This component can only be used within a [Filter](./filter).
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/filter/components/range/snippet.vue [FilterRange.vue]

:::

## Used components

- [Form](../../components/form)
    - [Column](../../components/form/column)
    - [Field](../../components/form/field)
    - [Slider](../../components/form/slider)
