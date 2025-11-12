---
outline: deep

props:
    -   name: direction
        description: The direction of the tooltip.
        type: [ '"horizontal"', '"vertical"' ]
        optional: true
        default: vertical

    -   name: content
        description: The content of the tooltip.
        type: string
        optional: true

slots:
    -   name: default
        description: The element the tooltip is attached to.

    -   name: content
        description: The content of the tooltip.
---

# Tooltip

The tooltip component can be used to display additional information when the user hovers an element. It tries to position the tooltip within the viewport. When the content needs to be complex, a slot can be used.

::: render
render=../../code/guide/components/tooltip/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tooltip.
example=../../code/guide/components/tooltip/basic.vue
:::

::: example Content || A tooltip that uses the content slot.
example=../../code/guide/components/tooltip/content.vue
:::
