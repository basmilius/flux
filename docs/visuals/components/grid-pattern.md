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

    -   name: glow
        description: Light up the grid lines with the primary color around the cursor.
        type: boolean
        default: false
        optional: true
---

# Grid pattern

A stylish SVG grid pattern component that fills any container and can be customized in terms of grid size, positioning, and stroke style. Supports highlighting specific squares.

::: render
render=../../code/visuals/grid-pattern/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Free || When used freely, the grid pattern fills its parent container.
example=../../code/visuals/grid-pattern/free.vue
:::

::: example Glow || With `glow` enabled, the grid lines light up around the cursor as it moves across the container, while the rest stays dimmed.
example=../../code/visuals/grid-pattern/glow.vue
:::
