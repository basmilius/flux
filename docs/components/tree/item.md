---
outline: deep

props:
    -   name: color
        description: The marker color, using a FluxColor name or a CSS color string.
        type: FluxColor | string
        default: gray
        optional: true

    -   name: is-highlighted
        description: Emphasizes the label with stronger text color and weight.
        type: boolean
        default: false
        optional: true

    -   name: label
        description: The label displayed next to the marker.
        type: string
        optional: true

slots:
    -   name: default
        description: Child FluxTreeItem components.

    -   name: label
        description: Custom content replacing the label prop.
---

# Tree item

An item in a [Tree](./). Place child `FluxTreeItem` components in the default slot. Use `is-highlighted` to emphasize an item within the hierarchy.

::: render
render=../../code/components/tree/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Custom label || Render additional text using the label slot.
example=../../code/components/tree/custom-label.vue
:::
