---
outline: deep

props:
    -   name: direction
        description: The direction of the legend.
        type: string
        optional: true
        default: horizontal

    -   name: items
        description: The items of the legend.
        type: FluxLegendObject[]
---

# Legend

The legend component displays a list of labeled color indicators, helping users quickly understand the meaning of different statuses, categories, or data groups.

::: render
render=../code/components/legend/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Horizontal || A horizontal legend.
example=../code/components/legend/horizontal.vue
:::

::: example Vertical || A vertical legend.
example=../code/components/legend/vertical.vue
:::
