---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ number ]

props:
    -   name: model-value
        description: The value of the slider.
        type: [ number ]

    -   name: disabled
        description: If the slider is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the slider is invalid. Sets aria-invalid.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Marks the slider as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the slider is readonly. Blocks interaction.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute of the underlying form control.
        type: string
        optional: true

    -   name: aria-label
        description: An accessible label for the slider, announced by assistive technology.
        type: string
        optional: true

    -   name: is-ticks-visible
        description: If the ticks are visible.
        type: boolean
        optional: true

    -   name: is-tooltip-disabled
        description: If the tooltip is disabled.
        type: boolean
        optional: true

    -   name: min
        description: The minimum value of the slider.
        type: number
        optional: true
        default: 0

    -   name: max
        description: The maximum value of the slider.
        type: number
        optional: true
        default: 100

    -   name: step
        description: The step size of the slider.
        type: number
        optional: true
        default: 1

    -   name: formatter
        description: The formatters of the slider.
        type: [ "(value: number, decimals?: number): string" ]
        optional: true
        default: "formatNumber"
---

# Slider

The slider lets users pick a single value from a range by dragging a thumb. Set `min`, `max` and `step` to define the range, and provide a `formatter` to control how the value is displayed.

::: render
render=../../../code/components/form/slider/preview.vue
:::

::: tip
Clicking anywhere on the track jumps the thumb to that position, and dragging keeps tracking the pointer even when it leaves the slider. The thumb can also be moved with the arrow keys for keyboard users.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic slider from 0 to 100.
example=../../../code/components/form/slider/basic.vue
:::

::: example Ticks || A slider where the ticks are visible.
example=../../../code/components/form/slider/ticks.vue
:::

::: example Custom formatter || A slider with a custom formatter.
example=../../../code/components/form/slider/formatter.vue
:::
