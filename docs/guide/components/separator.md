---
outline: deep

props:
    -   name: direction
        description: The direction of the separator
        type: FluxDirection
        optional: true
        default: horizontal
---

# Separator

The separator component is a visual divider used to separate content on a page. It has the ability to be oriented along the x-axis or y-axis, depending on the value of its axis property.

::: render
render=../../code/guide/components/separator/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Horizontal || A horizontal separator.
example=../../code/guide/components/separator/horizontal.vue
:::

::: example Vertical || A vertical separator.
example=../../code/guide/components/separator/vertical.vue
:::
