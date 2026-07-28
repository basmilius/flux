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

# Route

::: render
render=../../code/components/transitions/route/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A view slides in from the side the navigation came from, the way a page transition moves.
example=../../code/components/transitions/route/preview.vue
:::
