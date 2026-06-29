---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selection changes.
        type: [ "(string | number | boolean)[]" ]

props:
    -   name: model-value
        description: The array of selected values.
        type: "(string | number | boolean)[]"
        optional: true

    -   name: aria-label
        description: The accessible label of the group. Not needed when the group is wrapped in a Form field with as="group".
        type: string
        optional: true

    -   name: is-inline
        description: Lays the checkboxes out horizontally instead of stacked.
        type: boolean
        optional: true

    -   name: disabled
        description: If the entire group is disabled.
        type: boolean
        optional: true

    -   name: error
        description: The error message, marking every checkbox as invalid.
        type: string
        optional: true

    -   name: is-readonly
        description: If the group is read-only.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The checkboxes of the group, each rendered as a [Checkbox](./) with a value.
---

# Checkbox group

A checkbox group binds a set of [checkboxes](./) to a single array through `v-model`. Each checkbox carries a `value`; checking it adds that value to the array, unchecking removes it.

::: render
render=../../../code/components/form/checkbox/group/preview.vue
:::

::: tip
Wrap the group in a [Form field](../field/) with `as="group"` to attach an accessible group label. Used standalone, pass an `aria-label` instead. When the surrounding field is `required`, the group automatically receives `aria-required`, and setting `error` exposes `aria-invalid` on the group container.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A checkbox group inside a form field.
example=../../../code/components/form/checkbox/group/basic.vue
:::

::: example Inline || A checkbox group laid out horizontally.
example=../../../code/components/form/checkbox/group/inline.vue
:::

::: example Disabled item || A checkbox group with a single disabled option.
example=../../../code/components/form/checkbox/group/disabled.vue
:::

## Used components

- [Checkbox](./)
