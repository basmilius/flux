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

    -   name: error
        description: Error message describing why the range slider is invalid. Sets aria-invalid.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Marks the range slider as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the range slider is readonly. Blocks interaction.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute of the underlying form control.
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
        
    -   name: direction
        description: The direction of the range slider. A vertical range slider defaults to 210px tall, overridable with CSS.
        type: FluxDirection
        optional: true
        default: horizontal

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

    -   name: min-distance
        description: The minimum distance (in value units) kept between the lower and upper thumb.
        type: number
        optional: true
        default: 0
        
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

The range slider lets users select a range of values between a lower and an upper bound. It works like the [Slider](../slider/), but with two thumbs, one for each end of the range.

::: render
render=../../../code/components/form/slider/ranged/preview.vue
:::

::: tip
Clicking anywhere on the track moves the thumb closest to the pointer, so the range can be adjusted without grabbing a handle first. Use `min-distance` to keep a minimum gap between the two thumbs.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic range slider from 0 to 100.
example=../../../code/components/form/slider/ranged/basic.vue
:::

::: example Vertical || A vertical range slider. It defaults to 210px tall and can be resized with CSS.
example=../../../code/components/form/slider/ranged/vertical.vue
:::

::: example Minimum distance || A range slider that keeps at least 20 units between both thumbs.
example=../../../code/components/form/slider/ranged/min-distance.vue
:::

::: example Ticks || A range slider where the ticks are visible.
example=../../../code/components/form/slider/ranged/ticks.vue
:::

::: example Custom formatter || A range slider with a custom formatter.
example=../../../code/components/form/slider/ranged/formatter.vue
:::
