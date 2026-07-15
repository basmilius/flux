---
outline: deep

props:
    -   name: title
        description: The title of the comparison widget.
        type: string

    -   name: current
        description: The numeric value for the current period.
        type: number

    -   name: previous
        description: The numeric value for the previous period.
        type: number

    -   name: current-label
        description: The label shown above the current value. Defaults to `Current`.
        type: string
        optional: true

    -   name: previous-label
        description: The label shown above the previous value. Defaults to `Previous`.
        type: string
        optional: true

    -   name: footer
        description: A footer text shown below the delta indicator.
        type: string
        optional: true

    -   name: format
        description: An optional formatter applied to both values.
        type: "(value: number) => string"
        optional: true

    -   name: icon
        description: An icon shown in the header.
        type: FluxIconName
        optional: true

    -   name: show-delta
        description: Whether to show the calculated percentage delta. Defaults to `true`.
        type: boolean
        optional: true
---

# Comparison

The comparison widget renders two values side by side, typically a current period and a previous period. It automatically calculates and displays the percentage delta between them with a colored trend indicator.

::: render
render=../../code/statistics/components/comparison/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic comparison with whole-number values.
example=../../code/statistics/components/comparison/basic.vue
:::

::: example Formatted currency || A comparison with a formatter for currency values.
example=../../code/statistics/components/comparison/formatted-currency.vue
:::

::: example Negative trend || A comparison where the current period is worse than the previous one.
example=../../code/statistics/components/comparison/negative-trend.vue
:::

::: example Custom labels || A comparison with custom period labels and a formatter.
example=../../code/statistics/components/comparison/custom-labels.vue
:::

## Used components

- [Change](./change)
