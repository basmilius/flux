---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ DateTime | null ]

props:
    -   name: model-value
        description: The value of the checkbox.
        type: [ DateTime, null ]

    -   name: auto-complete
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

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
