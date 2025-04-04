---
outline: deep

props:
    -   name: width
        description: The width of each cell.
        type: number
        default: 42
        optional: true

    -   name: height
        description: The height of each cell.
        type: number
        default: 42
        optional: true

    -   name: stroke-dasharray
        description: The dasharray of the stroke.
        type: number
        default: 0
        optional: true

    -   name: squares
        description: Highlight specific cells.
        type: "Array<[x: number, y: number]>"
        default: [ ]
        optional: true
---

# Grid pattern

A stylish SVG grid pattern component that fills any container and can be customized in terms of grid size, positioning, and stroke style. Supports highlighting specific squares.

::: render
render=../../../code/guide/components/visual/grid-pattern/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Free || When used freely, the grid pattern fills its parent container.
example=../../../code/guide/components/visual/grid-pattern/free.vue
:::
