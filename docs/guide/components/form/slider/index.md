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

Sliders are a type of user interface component that allows users to select a single value from a specific range. They are widely used in various digital applications such as mobile apps, web applications, and desktop software. The main advantage of using a slider component is its ability to allow users to easily and quickly choose a desired value within a predefined range, without the need for any manual input.

::: render
render=../../../../code/guide/components/form/slider/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic slider from 0 to 100.
example=../../../../code/guide/components/form/slider/basic.vue
:::

::: example Ticks || A slider where the ticks are visible.
example=../../../../code/guide/components/form/slider/ticks.vue
:::

::: example Custom formatter || A slider with a custom formatter.
example=../../../../code/guide/components/form/slider/formatter.vue
:::
