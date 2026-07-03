---
outline: deep

props:
    -   name: columns
        description: The amount of columns the grid has.
        type: number
        optional: true
        default: 12

    -   name: gap
        description: The gap between columns.
        type: number
        optional: true
        default: 18

    -   name: tag
        description: The HTML tag to use for the grid.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: The content of the grid.
---

# Grid

The grid creates responsive layouts that adapt to any screen size. Its equal-width columns can be combined and rearranged to build complex page designs.

::: render
render=../../../code/components/layout/grid/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic grid.
example=../../../code/components/layout/grid/basic.vue
:::

::: example Responsive || Each column accepts breakpoint props (`xs`, `sm`, `md`, `lg`, `xl`) so the layout adapts to the viewport.
example=../../../code/components/layout/grid/responsive.vue
:::

::: tip
The class `column-example` is used in the documentation to display the columns.
:::
