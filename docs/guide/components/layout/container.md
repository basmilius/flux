---
outline: deep

props:
    -   name: gutter
        description: The gutter on each size of the container.
        type: number
        optional: true
        default: 30

slots:
    -   name: default
        description: The content within the container.
---

# Container

The primary container which dynamically changes widths based on the viewport.

::: render
render=../../../code/guide/components/layout/container/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic container.
example=../../../code/guide/components/layout/container/basic.vue
:::
