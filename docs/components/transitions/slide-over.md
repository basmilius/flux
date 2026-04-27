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

# Slide over

::: render
render=../../code/components/transitions/slide-over/preview.vue
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/transitions/slide-over/preview.vue [FluxSlideOverTransition.vue]

:::
