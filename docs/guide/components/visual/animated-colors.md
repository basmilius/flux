---
outline: deep

props:
    -   name: colors
        description: The colors of the animation.
        type: string[]

    -   name: incrementor
        description: Specifies how fast the animation goes.
        type: number
        default: 1
        optional: true

    -   name: opacity
        description: The opacity of the animation.
        type: number
        default: 0.5
        optional: true

    -   name: seed
        description: A seed to use for the randomizer of the animation.
        type: number
        optional: true
---

# Animated colors

The animated colors component presents an array of colors with a blurred animation effect, often used in the [Pane Illustration](../pane/illustration) component.

::: render
render=../../../code/guide/components/visual/animated-colors/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Free || When used freely, the animated colors fill the parent container.
example=../../../code/guide/components/visual/animated-colors/free.vue
:::

::: example Pane || The animated colors visual can be used to make pane's more alive.
example=../../../code/guide/components/visual/animated-colors/pane.vue
:::
