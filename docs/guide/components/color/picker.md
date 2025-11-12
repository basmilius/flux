---
outline: deep

emits:
    -   name: update:model-value
        description: The updated selected color.
        type: [ "string | [number, number, number]" ]

props:
    -   name: model-value
        description: The selected color.
        type: [ "string", "[number, number, number]" ]
        optional: true

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

This component allows users to select and adjust colors in various formats, including HEX, RGB, HSV, and HSL. It features a hue and saturation slider, an optional alpha slider for transparency control, and input fields for precise value adjustments.

::: render
render=../../../code/guide/components/color-picker/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic color picker that is shown directly.
example=../../../code/guide/components/color-picker/basic.vue
:::

::: example Flyout || A basic color picker that is shown directly.
example=../../../code/guide/components/color-picker/flyout.vue
:::

## Used components

- [Form](../form)
    - [Field](../form/field)
    - [Input](../form/input)
    - [Slider](../form/slider)
- [Pane](../pane)
