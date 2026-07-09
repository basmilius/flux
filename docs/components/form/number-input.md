---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value changes.
        type: [ number, "null" ]

    -   name: blur
        description: Triggered when the input loses focus.

    -   name: focus
        description: Triggered when the input gains focus.

props:
    -   name: model-value
        description: The numeric value of the input.
        type: [ number, "null" ]
        optional: true

    -   name: min
        description: The minimum allowed value. The value is clamped to this on blur and when stepping.
        type: number
        optional: true

    -   name: max
        description: The maximum allowed value. The value is clamped to this on blur and when stepping.
        type: number
        optional: true

    -   name: step
        description: The amount the value changes when stepping up or down. On blur the value is also snapped to the nearest multiple of this step, relative to `min` (or 0 when no `min` is set).
        type: number
        optional: true
        default: 1

    -   name: placeholder
        description: The placeholder shown when the input is empty.
        type: string
        optional: true

    -   name: disabled
        description: If the input is disabled.
        type: boolean
        optional: true

    -   name: error
        description: The error message, marking the input as invalid.
        type: string
        optional: true

    -   name: is-readonly
        description: If the input is read-only.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the input uses the secondary styling.
        type: boolean
        optional: true

requiredIcons:
    - angle-up
    - angle-down
---

# Number input

A number input is a form-integrated numeric field with stepper buttons. Users can type a value directly, use the up and down buttons, or the arrow keys to step by the configured `step`. The value is clamped to `min` and `max` when stepping and on blur, and on blur it is additionally snapped to the nearest `step`. It is bound through `v-model` as a `number` (or `null` when empty).

::: render
render=../../code/components/form/number-input/preview.vue
:::

::: tip
For a standalone amount picker outside of a form (such as a quantity in a shopping cart), consider the [Quantity selector](./quantity-selector) instead.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A number input inside a form field.
example=../../code/components/form/number-input/basic.vue
:::

::: example Range and step || A number input bound to a range with a custom step.
example=../../code/components/form/number-input/range.vue
:::

::: example Step snapping || Typed values snap to the nearest valid step (from `min`) and clamp on blur.
example=../../code/components/form/number-input/snapping.vue
:::

## Used components

- [Icon](../icon)
