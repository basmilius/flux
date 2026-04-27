---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ string ]

props:
    -   name: model-value
        description: The value of the input.
        type: string

    -   name: auto-complete
        description: Please refer to the HTMLInputElement documentation for examples of values that can be given here.
        type: FluxAutoCompleteType
        optional: true
        default: one-time-code
        
    -   name: auto-focus
        description: Focus the input when the form is mounted.
        type: boolean
        optional: true
        
    -   name: disabled
        description: If the input is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the input is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Marks the input as loading.
        type: boolean
        optional: true

    -   name: is-private
        description: If the input is private.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the input is readonly.
        type: boolean
        optional: true

    -   name: max-length
        description: The maximum value length of the input.
        type: number
        optional: true
        default: 6

    -   name: name
        description: The name attribute for the underlying fieldset.
        type: string
        optional: true
---

# PIN input

A pin input displays a given number of boxes where the user can type a pin-like value. This can, for example, be a TOTP code generated in a authenticator app.

::: render
render=../../code/components/form/pin-input/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic pin input.
example=../../code/components/form/pin-input/basic.vue
:::

::: example Toggle || A pin input where you can toggle the private state.
example=../../code/components/form/pin-input/toggle.vue
:::

::: example Custom || A pin input with a different amount of numbers.
example=../../code/components/form/pin-input/longer.vue
:::
