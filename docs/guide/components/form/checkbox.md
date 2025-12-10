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

requiredIcons:
    - check
    - minus
---

# Checkbox

A clean and functional input element that supports labels and multiple states, designed to enhance usability and accessibility in forms and interfaces.

::: render
render=../../../code/guide/components/form/checkbox/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic checkbox.
example=../../../code/guide/components/form/checkbox/basic.vue
:::

::: example Indeterminate || A checkbox with an indeterminate state.
example=../../../code/guide/components/form/checkbox/indeterminate.vue
:::
