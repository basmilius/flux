---
outline: deep

props:
    -   name: color
        description: The color of the flickering grid.
        type: string
        default: "#1d4ed8"
        optional: true

    -   name: flicker-chance
        description: The chance a flicker happens.
        type: number
        default: 0.15
        optional: true

    -   name: gap
        description: The gap between each cell.
        type: number
        default: 6
        optional: true

    -   name: max-opacity
        description: The maximum opacity of a cell.
        type: number
        default: 0.3
        optional: true

    -   name: size
        description: The size of each cell.
        type: number
        default: 3
        optional: true
---

# Flickering grid

Displays a dynamic grid of flickering squares, creating an eye-catching effect. Customize the grid's color, size, opacity, and spacing for added visual interest.

::: render
render=../../../code/guide/components/visual/flickering-grid/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Free || When used freely, the flickering grid fills the parent container.
example=../../../code/guide/components/visual/flickering-grid/free.vue
:::
