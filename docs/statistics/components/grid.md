---
outline: deep

props:
    -   name: gap
        description: The gap in pixels between grid items.
        type: number
        optional: true

    -   name: xs
        description: The number of columns on extra small screens.
        type: number
        optional: true

    -   name: sm
        description: The number of columns on small screens. Falls back to xs.
        type: number
        optional: true

    -   name: md
        description: The number of columns on medium screens. Falls back to sm.
        type: number
        optional: true

    -   name: lg
        description: The number of columns on large screens. Falls back to md.
        type: number
        optional: true

    -   name: xl
        description: The number of columns on extra large screens. Falls back to lg.
        type: number
        optional: true

slots:
    -   name: default
        description: The statistics widgets to display in the grid.
---

# Grid

The statistics grid is a responsive layout component for arranging statistics widgets. Column counts can be defined per breakpoint and cascade from smaller to larger screen sizes when not explicitly set.

::: render
render=../../code/statistics/components/grid/preview.vue
:::

<FrontmatterDocs/>
