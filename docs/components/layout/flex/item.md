---
outline: deep

props:
    -   name: basis
        description: The initial main size of the flex item. A number is treated as pixels; a string is used as-is.
        type: number | string
        optional: true

    -   name: grow
        description: The flex-grow factor.
        type: number
        optional: true

    -   name: shrink
        description: The flex-shrink factor.
        type: number
        optional: true

slots:
    -   name: default
        description: The content of the flex item. When a single child is provided, no wrapper element is rendered and the flex styles are applied directly to that child. When multiple children are provided, they are wrapped in a `div`.
---

# Flex item

A transparent helper for controlling the `flex-grow`, `flex-shrink`, and `flex-basis` of a child within a [`FluxFlex`](./) container. When you pass a single child, `FluxFlexItem` does not introduce an extra DOM element; the flex styles are merged onto the child directly.

::: render
render=../../../code/components/layout/flex/item/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Grow || Use `grow` to let an item take up the remaining space.
example=../../../code/components/layout/flex/item/grow.vue
:::

::: example Basis || Set an explicit `basis` to control the initial size of an item.
example=../../../code/components/layout/flex/item/basis.vue
:::
