---
outline: deep

props:
    -   name: direction
        description: The direction in which the elements are stacked.
        type: string
        optional: true
        default: vertical

    -   name: gap
        description: The gap between each element.
        type: number
        optional: true
        default: 30

    -   name: is-centered
        description: If the elements should be centered.
        type: boolean
        optional: true

    -   name: is-fill
        description: If the elements should fill the available space.
        type: boolean
        optional: true

    -   name: is-wrapping
        description: If the elements should wrap when there is not enough space.
        type: boolean
        optional: true

    -   name: tag
        description: The HTML tag to use for the stack.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: The content that should be stacked.
---

# Stack

A stack component is a layout component that arranges child elements in a stack along a specified axis, with a configurable gap between elements. The axis property defines the direction in which the elements are stacked (e.g. horizontally or vertically), while the gap property sets the size of the space between elements. Stacks can be used to organize content in a compact and organized manner and are commonly used to create simple and flexible layouts in web and mobile applications.

::: render
render=../../../../code/guide/components/layout/stack/preview.vue
:::

<FrontmatterDocs/>

## Available stacks
- [Badge](./badge)
- [Button](./button)
- [Info](./info)
- [Notice](./notice)
- [Tag](./tag)

## Examples

::: tip
The class `column-example` is used in the documentation to display the columns.
:::

::: example Horizontal || A horizontal stack.
example=../../../../code/guide/components/layout/stack/horizontal.vue
:::

::: example Vertical || A vertical stack.
example=../../../../code/guide/components/layout/stack/vertical.vue
:::
