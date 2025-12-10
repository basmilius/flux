---
outline: deep

props:
    -   name: is-legend-visible
        description: If the legend should be visible.
        type: boolean
        optional: true

    -   name: items
        description: The items of the percentage bar.
        type: FluxPercentageBarItemObject[]
---

# Percentage bar

A dynamic percentage bar visually represents the distribution of various items, offering a user-friendly interface to discern the proportional breakdown. Additionally, a legend can be shown for further clarification and enhanced data interpretation.

::: render
render=../../code/guide/components/percentage-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic percentage bar.
example=../../code/guide/components/percentage-bar/basic.vue
:::

::: example Plain || A percentage bar without legend items.
example=../../code/guide/components/percentage-bar/plain.vue
:::

## Used components

- [Tooltip](./tooltip)
- [Icon](./icon)
- [Legend](./legend)
