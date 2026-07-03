---
outline: deep

emits:
    -   name: update:is-expanded
        description: Triggered when the group is collapsed or expanded.
        type: [ boolean ]

props:
    -   name: label
        description: The label shown in the group header.
        type: string

    -   name: icon
        description: An optional icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: is-expandable
        description: Whether the group can be collapsed and expanded by clicking its header.
        type: boolean
        optional: true

    -   name: is-expanded
        description: Controls whether the group is expanded. Only relevant when `is-expandable` is set, and defaults to expanded.
        type: boolean
        optional: true
        default: true

slots:
    -   name: default
        description: The rows that belong to the group. Hidden while the group is collapsed.

    -   name: after
        description: Content shown at the end of the group header, after the label.

requiredIcons:
    - angle-right
---

# Table group

The table group renders a full-width header row that gathers a set of rows under a shared label. It can optionally be made expandable, so its rows collapse and reveal when the header is clicked.

::: render
render=../../code/components/table/group/preview.vue
:::

::: tip
This component is best used within a [Table](./index). For dynamic data, combine it with the [Data table](../data-table)'s `group-by` prop and `#group` slot.
:::

<FrontmatterDocs/>

## Examples

::: example Plain || Groups used as static section headers, without collapsing.
example=../../code/components/table/group/plain.vue
:::

::: example Icon || Group headers with an icon before their label.
example=../../code/components/table/group/icon.vue
:::

::: example Expandable || Collapsible groups with their open state bound through `v-model:is-expanded`.
example=../../code/components/table/group/expandable.vue
:::

::: example After slot || Summaries and actions rendered at the end of the group header.
example=../../code/components/table/group/after.vue
:::
