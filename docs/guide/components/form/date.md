---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ DateTime | null ]
        
    -   name: blur
        description: Triggered when the input loses focus.
        type: [ ]
        
    -   name: focus
        description: Triggered when the input receives focus.
        type: [ ]

props:
    -   name: model-value
        description: The value.
        type: [ DateTime, null ]

    -   name: auto-complete
        description: Please refer to the HTMLInputElement documentation for examples of values that can be given here.
        type: FluxAutoCompleteType
        optional: true

    -   name: auto-focus
        description: Focus the input when the form is mounted.
        type: boolean
        optional: true

    -   name: disabled
        description: Disable the form input.
        type: boolean
        optional: true

    -   name: is-readonly
        description: Make the form input read-only.
        type: string
        optional: true

    -   name: max
        description: The maximum selectable date.
        type: DateTime
        optional: true

    -   name: min
        description: The minimum selectable date.
        type: DateTime
        optional: true

    -   name: placeholder
        description: The placeholder that is visible in the form input.
        type: string
        optional: true

requiredIcons:
    - angle-left
    - angle-right
    - calendar
---

# Date

An input element designed for selecting dates, incorporating a dropdown interface with a calendar for ease of use. Provides support for configurable options such as minimum and maximum date ranges.

::: render
render=../../../code/guide/components/form/date/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic date input.
example=../../../code/guide/components/form/date/basic.vue
:::

::: example Limited || A date input with a minimal and maximum value.
example=../../../code/guide/components/form/date/limited.vue
:::

## Used components

- [Flyout](../flyout)
- [Date picker](../date-picker)
- [Form](../form)
    - [Input](./input)
    - [Input group](./input/group)
- [Button](../button)
    - [Secondary](../button/secondary)
