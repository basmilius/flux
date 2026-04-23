---
outline: deep

props:
    -   name: auto-complete
        description: The autocomplete attribute for the underlying input.
        type: FluxAutoCompleteType
        optional: true

    -   name: auto-focus
        description: Automatically focuses the input when mounted.
        type: boolean
        optional: true

    -   name: disabled
        description: Disables the input.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the input is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-condensed
        description: Renders the input in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-loading
        description: Marks the input as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: Makes the input read-only. Blocks opening the picker.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true

    -   name: max
        description: The maximum selectable date.
        type: DateTime
        optional: true

    -   name: min
        description: The minimum selectable date.
        type: DateTime
        optional: true

    -   name: name
        description: The name attribute for the underlying form control.
        type: string
        optional: true

    -   name: placeholder
        description: The placeholder text when no date range is selected.
        type: string
        optional: true

    -   name: range-mode
        description: The range selection mode.
        type: "'range' | 'week' | 'month'"
        default: "'range'"
        optional: true

requiredIcons:
    - calendar
---

# Date range

A date range picker that allows users to select a start and end date. It displays a formatted label of the selected date range and opens a calendar flyout when clicked. The `v-model` value is a tuple of two Luxon `DateTime` objects or `null`.

::: render
render=../../../code/guide/components/form/date-range/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Range || Free selection of a start and end date. This is the default mode.
example=../../../code/guide/components/form/date-range/basic.vue
:::

::: example Week || Selects an entire week at once by setting `range-mode` to `week`.
example=../../../code/guide/components/form/date-range/week.vue
:::

::: example Month || Selects an entire month at once by setting `range-mode` to `month`.
example=../../../code/guide/components/form/date-range/month.vue
:::

## Used components

- [Button](../button)
    - [Secondary](../button/secondary)
- [Date picker](../date-picker)
- [Flyout](../flyout)
- [Form](.)
    - [Input group](./input/group)
