---
outline: deep

props:
    -   name: value
        description: The current value as a fraction between 0 and 1.
        type: number

    -   name: color
        description: The color of the meter bar. Accepts a FluxColor or a custom hex color.
        type: [ 'FluxColor', '`#${string}`' ]
        optional: true

    -   name: footer
        description: A footer text shown below the bar.
        type: string
        optional: true

    -   name: icon
        description: An icon shown in the header.
        type: FluxIconName
        optional: true

    -   name: is-small
        description: Renders the meter in a compact style.
        type: boolean
        optional: true

    -   name: sub-title
        description: A secondary title shown next to the main title.
        type: string
        optional: true

    -   name: tip
        description: A tip text shown to the right of the percentage.
        type: string
        optional: true

    -   name: title
        description: The title of the meter.
        type: string
        optional: true
---

# Meter

The meter widget visualizes a value as a horizontal progress bar. It supports theming with any Flux color or a custom hex color and can display a title, subtitle, tip, and footer alongside the percentage.

::: render
render=../../code/statistics/components/meter/preview.vue
:::

<FrontmatterDocs/>
