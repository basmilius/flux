---
outline: deep

props:
    -   name: appear
        description: Also plays the transition on the initial render.
        type: boolean
        optional: true

    -   name: from
        description: The scale the element enters from and leaves to.
        type: number
        optional: true
        default: 0.95

    -   name: mode
        description: Defines how transitions are coordinated between entering and leaving elements.
        type: [ 'in-out', 'out-in' ]
        optional: true
        default: 'out-in'

    -   name: origin
        description: The point the element scales from, the same value as the CSS transform-origin property.
        type: string
        optional: true
        default: center

slots:
    -   name: default
        description: The element that should be animated.
---

# Scale

The scale transition fades an element in while it grows from a slightly smaller size, and reverses that on the way out. Use it for content that appears in place, such as a popover, a dropdown panel or a confirmation card.

::: render
render=../../code/components/transitions/scale/preview.vue
:::

::: tip
[Breakthrough](./breakthrough) and [Route](./route) scale their content as well, but they are tuned for whole views moving forward and backward. Scale is the general purpose one, with a configurable scale and origin.
:::

::: info
When the visitor prefers reduced motion, the element only fades and no longer scales.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/transitions/scale/preview.vue [FluxScaleTransition.vue]

:::
