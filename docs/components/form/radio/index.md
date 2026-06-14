---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected radio changes.
        type: [ string, number, boolean ]

props:
    -   name: model-value
        description: The value of the selected radio.
        type: [ string, number, boolean ]
        optional: true

    -   name: name
        description: The shared name of the underlying radio inputs. Generated automatically when omitted.
        type: string
        optional: true

    -   name: aria-label
        description: The accessible label of the radio group.
        type: string
        optional: true

    -   name: is-inline
        description: Lays the radios out horizontally instead of stacked.
        type: boolean
        optional: true

    -   name: disabled
        description: If the entire radio group is disabled.
        type: boolean
        optional: true

    -   name: error
        description: The error message, marking every radio as invalid.
        type: string
        optional: true

    -   name: is-readonly
        description: If the radio group is read-only.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The radios of the group, rendered as [Radio](./item) components.
---

# Radio group

A radio group lets users pick a single option from a small, fully visible set of choices. Each choice is a [Radio](./item), and the selected one is bound through `v-model` and reflects the `value` of the active radio.

::: render
render=../../../code/components/form/radio/preview.vue
:::

::: tip
Reach for a radio group when every option should stay visible at a glance. When the list is long or space is tight, prefer a [Select](../select/) instead.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A radio group inside a form field.
example=../../../code/components/form/radio/basic.vue
:::

::: example Inline || A radio group laid out horizontally.
example=../../../code/components/form/radio/inline.vue
:::

::: example Disabled item || A radio group with a single disabled option.
example=../../../code/components/form/radio/disabled.vue
:::

## Used components

- [Radio](./item)
