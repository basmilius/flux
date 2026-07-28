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

# Bottom sheet

::: render
render=../../code/components/transitions/bottom-sheet/preview.vue
:::

::: tip
[Bottom sheet](../bottom-sheet) already uses this transition. Reach for it directly only when you build a sheet-like surface of your own.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/transitions/bottom-sheet/preview.vue [FluxBottomSheetTransition.vue]

:::
