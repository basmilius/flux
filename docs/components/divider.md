---
outline: deep

props:
    -   name: content-placement
        description: The placement of the content.
        type: [ '"start"', '"center"', '"end"' ]
        optional: true
        default: center

    -   name: direction
        description: The orientation of the divider.
        type: FluxDirection
        optional: true
        default: horizontal

slots:
    -   name: default
        description: The content shown within the divider.
---

# Divider

This component serves as a horizontal content divider, offering the flexibility to include custom content or default to displaying a simple line. The content alignment can be adjusted to the start, center, or end based on the configuration.

::: render
render=../code/components/divider/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Clear || A standalone divider.
example=../code/components/divider/clear.vue
:::

::: example Button || A divider with a button at the end.
example=../code/components/divider/button.vue
:::

::: example Icon || A divider with a centered icon.
example=../code/components/divider/icon.vue
:::
