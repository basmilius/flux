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

<script
    lang="ts"
    setup>
    import { FluxFlickeringGrid } from '@basmilius/flux';
</script>

# Flickering grid

Displays a dynamic grid of flickering squares, creating an eye-catching effect. Customize the grid's color, size, opacity, and spacing for added visual interest.

<div style="height: 258px; contain: paint;">
    <FluxFlickeringGrid/>
</div>

<FrontmatterDocs/>
