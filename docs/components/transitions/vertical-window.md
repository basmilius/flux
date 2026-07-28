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

# Vertical window

::: render
render=../../code/components/transitions/vertical-window/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Two views stacked on top of each other, moving up or down depending on the direction.
example=../../code/components/transitions/vertical-window/preview.vue
:::
