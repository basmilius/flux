---
outline: deep

props:
    -   name: width
        description: The width of each cell.
        type: number
        default: 16
        optional: true

    -   name: height
        description: The height of each cell.
        type: number
        default: 16
        optional: true

    -   name: cr
        description: The radius of each dot.
        type: number
        default: 1
        optional: true

    -   name: cx
        description: The center-x of each dot.
        type: number
        default: 1
        optional: true

    -   name: cy
        description: The center-y of each dot.
        type: number
        default: 1
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxDotPattern } from '@basmilius/flux';
</script>

# Dot pattern

A customizable SVG-based dot pattern component that can seamlessly fill any container. Adjust properties like dot size and positioning, ideal for backgrounds and overlays.

<div style="height: 258px; contain: paint;">
    <FluxDotPattern
        :width="15"
        :height="15"
        style="fill: rgb(var(--primary-7))"/>
</div>

<FrontmatterDocs/>
