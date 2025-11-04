---
outline: deep

props:
    -   name: direction
        description: The direction in which the elements are stacked.
        type: string
        optional: true
        default: horizontal
        
    -   name: gap
        description: The gap between each button.
        type: number
        optional: true
        default: 9
        
    -   name: is-fill
        description: If the buttons should fill the available space.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The buttons that should be stacked.
---

# Button

The button stack arranges buttons along a chosen axis. Whether stacked vertically or aligned horizontally, it ensures clear spacing and visual balance between related actions.

::: render
render=../../../../code/guide/components/layout/stack/button/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Horizontal || A horizontal button stack.
example=../../../../code/guide/components/layout/stack/button/horizontal.vue
:::

::: example Vertical || A vertical button stack.
example=../../../../code/guide/components/layout/stack/button/vertical.vue
:::

## Used components

- [Stack](../stack)
