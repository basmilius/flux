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

    -   name: is-readonly
        description: Makes the input read-only.
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

::: example Basic || A basic date range input.
example=../../../code/guide/components/form/date-range/basic.vue
:::

::: example Week mode || A date range input that selects entire weeks.
example=../../../code/guide/components/form/date-range/week.vue
:::

## Range modes

The `range-mode` prop controls how the date range is selected:

- **range** (default) — Free selection of start and end date.
- **week** — Selects an entire week at once.
- **month** — Selects an entire month at once.

## Used components

- [Date picker](../date-picker)
- [Flyout](../flyout)
- [Form input group](./input/group)
- [Secondary button](../button/secondary)
