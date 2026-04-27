---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ boolean ]

props:
    -   name: model-value
        description: The value of the checkbox.
        type: [ boolean, null ]

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string
        optional: true

    -   name: disabled
        description: If the checkbox is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the checkbox is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-readonly
        description: If the checkbox is readonly. Blocks toggling via mouse or keyboard.
        type: boolean
        optional: true

requiredIcons:
    - check
    - minus
---

# Checkbox

A clean and functional input element that supports labels and multiple states, designed to enhance usability and accessibility in forms and interfaces.

::: render
render=../../code/components/form/checkbox/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic checkbox.
example=../../code/components/form/checkbox/basic.vue
:::

::: example Indeterminate || A checkbox with an indeterminate state.
example=../../code/components/form/checkbox/indeterminate.vue
:::
