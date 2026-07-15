---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ number, number ]

props:
    -   name: model-value
        description: The value of the range fader.
        type: [ '[number, number]' ]

    -   name: disabled
        description: If the range fader is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the range fader is invalid. Sets aria-invalid.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Marks the range fader as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the range fader is readonly. Blocks interaction.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute of the underlying form control.
        type: string
        optional: true

    -   name: label
        description: The label shown on the left inside the range fader.
        type: string
        optional: true

    -   name: color
        description: The color of the filled value. The track always stays neutral.
        type: FluxColor
        optional: true
        default: primary

    -   name: icon-leading
        description: An icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: An icon shown after the value.
        type: FluxIconName
        optional: true

    -   name: is-ticks-visible
        description: Forces the detent marks to show. They already appear automatically on stepped range faders.
        type: boolean
        optional: true

    -   name: is-value-hidden
        description: Hides the value shown on the right inside the range fader.
        type: boolean
        optional: true

    -   name: direction
        description: The direction of the range fader. A vertical range fader is a slim column with rotated text and defaults to 210px tall, overridable with CSS.
        type: FluxDirection
        optional: true
        default: horizontal

    -   name: min
        description: The minimum value of the range fader.
        type: number
        optional: true
        default: 0

    -   name: max
        description: The maximum value of the range fader.
        type: number
        optional: true
        default: 100

    -   name: min-distance
        description: The minimum distance (in value units) kept between the lower and upper thumb.
        type: number
        optional: true
        default: 0

    -   name: step
        description: The step size of the range fader.
        type: number
        optional: true
        default: 1

    -   name: formatter
        description: The formatter for the displayed values.
        type: [ "(value: number, decimals?: number): string" ]
        optional: true
        default: "formatNumber"
---

# Range fader

The range fader lets users select a range of values between a lower and an upper bound. It works like the [Fader](../fader/), but with two thumbs, one for each end of the range, and shows both values on the right.

::: render
render=../../../code/components/form/fader/ranged/preview.vue
:::

::: tip
Clicking anywhere on the track moves the thumb closest to the pointer, so the range can be adjusted without grabbing a handle first. Tab between the two thumbs and use the arrow keys to fine-tune each bound. Use `min-distance` to keep a minimum gap between the two thumbs.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic range fader from 0 to 100.
example=../../../code/components/form/fader/ranged/basic.vue
:::

::: example Vertical || A vertical range fader: a slim column with rotated text, 210px tall by default and resizable with CSS.
example=../../../code/components/form/fader/ranged/vertical.vue
:::

::: example Minimum distance || A range fader that keeps at least 20 units between both thumbs.
example=../../../code/components/form/fader/ranged/min-distance.vue
:::

::: example Steps || A stepped range fader that snaps to detents and shows their marks automatically.
example=../../../code/components/form/fader/ranged/ticks.vue
:::

::: example Colors || A range fader per color; the color only tints the value, the track stays neutral.
example=../../../code/components/form/fader/ranged/colors.vue
:::

::: example Custom formatter || A range fader with a custom formatter.
example=../../../code/components/form/fader/ranged/formatter.vue
:::
