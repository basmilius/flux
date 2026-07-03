---
outline: deep

emits:
    -   name: update:model-value
        description: The updated selected color.
        type: [ "string | [number, number, number]" ]

    -   name: update:alpha
        description: The updated alpha value, from 0 to 1.
        type: [ number ]

props:
    -   name: model-value
        description: The selected color.
        type: [ "string", "[number, number, number]" ]
        optional: true

    -   name: alpha
        description: The alpha (opacity) value, from 0 to 1. Use `v-model:alpha` to control it, together with `is-alpha-enabled`.
        type: number
        optional: true
        default: 1

    -   name: is-alpha-enabled
        description: Enables the alpha slider.
        type: boolean
        optional: true

    -   name: type
        description: The color format used.
        type: [ '"hex"', '"rgb"', '"hsl"', '"hsv"' ]
        default: hex
        optional: true
---

# Color picker

The color picker lets users select and adjust a color in HEX, RGB, HSV, or HSL. It offers a hue and saturation area, an optional alpha slider for transparency, and input fields for precise values.

::: render
render=../../code/components/color-picker/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic color picker that is shown directly.
example=../../code/components/color-picker/basic.vue
:::

::: example Flyout || A basic color picker that is shown directly.
example=../../code/components/color-picker/flyout.vue
:::

## Used components

- [Form](../form)
    - [Field](../form/field)
    - [Input](../form/input)
    - [Slider](../form/slider)
- [Pane](../pane)
