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

    -   name: is-connected
        description: Joins [Radio tiles](./tile) into a single block with shared borders and rounded outer corners. Not meant to be mixed with regular radios.
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
        description: The radios of the group, rendered as [Radio](./) components.
---

# Radio group

A radio group lets users pick a single option from a small, fully visible set of choices. Each choice is a [Radio](./), and the selected one is bound through `v-model` and reflects the `value` of the active radio.

::: render
render=../../../code/components/form/radio/group/preview.vue
:::

::: tip
Reach for a radio group when every option should stay visible at a glance. When the list is long or space is tight, prefer a [Select](../select/) instead. When wrapped in a `required` [Form field](../field/), the group (`role="radiogroup"`) automatically receives `aria-required`, and setting `error` exposes `aria-invalid`.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A radio group inside a form field.
example=../../../code/components/form/radio/group/basic.vue
:::

::: example Inline || A radio group laid out horizontally.
example=../../../code/components/form/radio/group/inline.vue
:::

::: example Disabled item || A radio group with a single disabled option.
example=../../../code/components/form/radio/group/disabled.vue
:::

::: example Tile || Card-style options through [Radio tile](./tile), with an icon and description.
example=../../../code/components/form/radio/tile/stacked.vue
:::

::: example Mixed || Combine tiles with a regular radio for a less prominent option.
example=../../../code/components/form/radio/tile/mixed.vue
:::

::: example Connected || Join the tiles into a single block with is-connected.
example=../../../code/components/form/radio/tile/connected.vue
:::

## Used components

- [Radio](./)
- [Radio tile](./tile)
