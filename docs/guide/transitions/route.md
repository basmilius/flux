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
render=../../code/guide/transitions/route/preview.vue
:::

<FrontmatterDocs/>
