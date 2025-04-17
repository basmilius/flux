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
        description: The label that is shown next to the checkbox.
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
