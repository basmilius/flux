---
outline: deep

props:
    -   name: mode
        description: Defines how transitions are coordinated between entering and leaving elements.
        type: [ 'in-out', 'out-in' ]
        optional: true
        default: 'out-in'

slots:
    -   name: default
        description: The element that should be animated.
---

# Tooltip

::: render
render=../../code/components/transitions/tooltip/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A short scale and fade, tuned for a small surface that appears next to its trigger.
example=../../code/components/transitions/tooltip/preview.vue
:::
