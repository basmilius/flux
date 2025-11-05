---
outline: deep

props:
    -   name: size
        description: The size of the spacing. This value is not the actual size, but a reference to it.
        type: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
---

# Spacing

The spacing component adds a div within its parent flex container with a predefined size. It works in both column and row flex containers. The sizes are predefined. Spacings are invisible elements and are made visible for demo purposes.

::: render
render=../../../code/guide/components/layout/spacing/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: tip
The class `spacing-example` is used in the documentation to display the columns.
:::

::: example Horizontal || A horizontal spacing.
example=../../../code/guide/components/layout/spacing/horizontal.vue
:::

::: example Vertical || A vertical spacing.
example=../../../code/guide/components/layout/spacing/vertical.vue
:::
