---
outline: deep

props:
    -   name: gutter
        description: The gutter on each side of the container.
        type: number
        optional: true
        default: 18

slots:
    -   name: default
        description: The content within the container.
---

# Container

The primary container which dynamically changes widths based on the viewport.

::: render
render=../../code/components/layout/container/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic container.
example=../../code/components/layout/container/basic.vue
:::
