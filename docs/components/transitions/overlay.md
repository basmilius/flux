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

# Overlay

::: render
render=../../code/components/transitions/overlay/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The surface of a dialog scales up out of its shade and settles at its final size.
example=../../code/components/transitions/overlay/preview.vue
:::
