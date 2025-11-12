---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ object, string, number, null ]

    -   name: blur
        description: Triggered when the input loses focus.
        type: [ ]

    -   name: focus
        description: Triggered when the input receives focus.
        type: [ ]

props:
    -   name: model-value
        description: The value of the input.
        type: [ object, string, number, null ]

    -   name: auto-complete
        description: Please refer to the HTMLInputElement documentation for examples of values that can be given here.
        type: FluxAutoCompleteType
        optional: true
        
    -   name: auto-focus
        description: Focus the input when the form is mounted.
        type: boolean
        optional: true
        default: false
        
    -   name: icon-leading
        description: The icon at the start of the input.
        type: FluxIconName
        optional: true
        
    -   name: icon-trailing
        description: The icon at the end of the input.
        type: FluxIconName
        optional: true
        
    -   name: disabled
        description: If the input is disabled.
        type: boolean
        optional: true
        
    -   name: is-condensed
        description: ??
        type: boolean
        optional: true
        
    -   name: is-readonly
        description: If the input is readonly.
        type: boolean
        optional: true
        
    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true
        
    -   name: max
        description: The maximum value of the input.
        type: [ string, number ]
        optional: true
        
    -   name: max-length
        description: The maximum value length of the input.
        type: number
        optional: true
        
    -   name: min
        description: The minimum value of the input.
        type: [ string, number ]
        optional: true
        
    -   name: pattern
        description: The pattern attribute specifies a regular expression the form control's value should match. If a non-null value doesn't conform to the constraints set by the pattern value, the ValidityState object's read-only patternMismatch property will be true.
        type: FluxInputMask
        optional: true
        
    -   name: placeholder
        description: The placeholder of the input.
        type: string
        optional: true
        
    -   name: step
        description: The step attribute is a number that specifies the granularity that the value must adhere to or the keyword any. It is valid for the numeric input types, including the date, month, week, time, datetime-local, number and range types.
        type: number
        optional: true
        
    -   name: type
        description: The type of the input.
        type: FluxInputType
        optional: true
        default: text

requiredIcons:
    - eye
    - eye-slash
---

# Input

A form input is a text field that consists of a single line. It accepts various data types that can be specified using the type prop.

::: render
render=../../../../code/guide/components/form/input/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic form input.
example=../../../../code/guide/components/form/input/basic.vue
:::

::: example Icon || Form input with an icon.
example=../../../../code/guide/components/form/input/icon.vue
:::

::: example Password || A password form input.
example=../../../../code/guide/components/form/input/password.vue
:::

::: example Pattern || A form input with a pattern.
example=../../../../code/guide/components/form/input/pattern.vue
:::

## Used components

- [Icon](../../icon)
