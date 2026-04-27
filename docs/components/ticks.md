---
outline: deep

props:
    -   name: lower
        description: The lowest tick value.
        type: number

    -   name: upper
        description: The highest tick value.
        type: number
---

# Ticks

The ticks component displays visual tick marks along a slider track to help users understand the scale and spacing of values. It generates both major and minor ticks based on the slider’s lower and upper bounds, placing them proportionally along the track.

::: render
render=../code/components/ticks/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic ticks track.
example=../code/components/ticks/basic.vue
:::
