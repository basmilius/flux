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

# Sheet

::: render
render=../../code/components/transitions/sheet/preview.vue
:::

::: tip
[Sheet](../sheet) already uses this transition. It slides the surface in and out from the edge its position class names, without a fade: a sheet travels, it does not appear. Pair it with one of those position classes when you build a sheet-like surface of your own.

The sheet itself opts out of the arrival, because it drives that half with a spring so it can overshoot once on the way in. A surface marked as sprung keeps this transition's exit and skips its entrance.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || The surface travels in from the edge it is attached to, without a fade.
example=../../code/components/transitions/sheet/preview.vue
:::
