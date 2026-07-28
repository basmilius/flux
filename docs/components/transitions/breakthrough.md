---
outline: deep

props:
    -   name: is-back
        description: Use the returning version of the transition.
        type: boolean
        optional: true

    -   name: mode
        description: Defines how transitions are coordinated between entering and leaving elements.
        type: [ 'in-out', 'out-in' ]
        optional: true
        default: 'out-in'

slots:
    -   name: default
        description: The element that should be animated.
---

# Breakthrough

::: render
render=../../code/components/transitions/breakthrough/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The view grows towards the visitor as it arrives and falls away behind the next one as it leaves.
example=../../code/components/transitions/breakthrough/preview.vue
:::
