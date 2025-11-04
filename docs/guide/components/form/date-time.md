---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ DateTime | null ]

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

    -   name: is-hour-only
        description: Always round the time to whole hours.
        type: string
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

# Date time

An input element designed for selecting dates and times, incorporating a dropdown interface with a calendar for ease of use. Provides support for configurable options such as minimum and maximum date ranges.

::: render
render=../../../code/guide/components/form/date-time/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic date time input.
example=../../../code/guide/components/form/date-time/basic.vue
:::

::: example Hour only || A date time input where the time is always rounded to whole hours.
example=../../../code/guide/components/form/date-time/hour-only.vue
:::

## Used components

- [Flyout](../flyout)
- [Date picker](../date-picker)
- [Form](../form)
    - [Input](./input)
    - [Input group](./input-group)
- [Button](../button)
    - [Secondary](../button/secondary)
- [Layout](../layout)
  - [Stack](../layout/stack)
