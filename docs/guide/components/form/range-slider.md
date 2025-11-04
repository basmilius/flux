---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ number, number ]

props:
    -   name: model-value
        description: The value of the range slider.
        type: [ '[number, number]' ]

    -   name: disabled
        description: If the range slider is disabled.
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
        description: The minimum value of the range slider.
        type: number
        optional: true
        default: 0
        
    -   name: max
        description: The maximum value of the range slider.
        type: number
        optional: true
        default: 100
        
    -   name: step
        description: The step size of the range slider.
        type: number
        optional: true
        default: 1
        
    -   name: formatter
        description: The formatters of the range slider.
        type: [ "(value: number, decimals?: number): string" ]
        optional: true
        default: "formatNumber"
---

# Range slider

A range slider is a user interface component that allows users to select two values within a predefined range. It is similar to a single-value slider, but instead of selecting a single value, a range slider allows the user to select a range of values between two endpoints. The two endpoints of the slider represent the minimum and maximum values of the range, and the user can adjust the position of each endpoint to select the desired range.

::: render
render=../../../code/guide/components/form/range-slider/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic range slider from 0 to 100.
example=../../../code/guide/components/form/range-slider/basic.vue
:::

::: example Ticks || A range slider where the ticks are visible.
example=../../../code/guide/components/form/range-slider/ticks.vue
:::

::: example Custom formatter || A range slider with a custom formatter.
example=../../../code/guide/components/form/range-slider/formatter.vue
:::
