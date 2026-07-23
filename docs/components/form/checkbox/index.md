---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ boolean ]

props:
    -   name: model-value
        description: The value of the checkbox. Used when the checkbox is standalone.
        type: [ boolean, null ]

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string
        optional: true

    -   name: sub-label
        description: A secondary line of text shown below the label. The checkbox stays aligned with the label.
        type: string
        optional: true

    -   name: value
        description: The value this checkbox contributes to a surrounding [Checkbox group](./group). Only used inside a FluxFormCheckboxGroup.
        type: [ string, number, boolean ]
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

slots:
    -   name: label
        description: Replaces the label and sub-label with custom content, allowing HTML inside the text area of the checkbox.

requiredIcons:
    - check
    - minus
---

# Checkbox

A clean and functional input element that supports labels and multiple states, designed to enhance usability and accessibility in forms and interfaces.

::: render
render=../../../code/components/form/checkbox/preview.vue
:::

::: tip
To bind a set of checkboxes to a single array, use a [Checkbox group](./group). When you place more than one control in a single [Form field](../field/), set `as="group"` on the field so the label is rendered as a group label (`role="group"` + `aria-labelledby`) instead of a single `<label for>`.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple and basic checkbox.
example=../../../code/components/form/checkbox/basic.vue
:::

::: example Indeterminate || A checkbox with an indeterminate state.
example=../../../code/components/form/checkbox/indeterminate.vue
:::

::: example Sub-label || A checkbox with a secondary line of text below the label.
example=../../../code/components/form/checkbox/sub-label.vue
:::

::: example Custom label || A checkbox that uses the label slot to render HTML inside its label.
example=../../../code/components/form/checkbox/custom-label.vue
:::

::: example Disabled || A disabled checkbox in both the checked and unchecked state.
example=../../../code/components/form/checkbox/disabled.vue
:::

::: example Invalid || A checkbox with an error message.
example=../../../code/components/form/checkbox/invalid.vue
:::

::: example Read-only || A read-only checkbox that cannot be toggled.
example=../../../code/components/form/checkbox/readonly.vue
:::

## Used components

- [Checkbox group](./group)
- [Icon](../../icon)
