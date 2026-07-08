---
outline: deep

props:
    -   name: value
        description: The value of the segment, bound to the segmented control's model.
        type: [ string, number ]

    -   name: disabled
        description: If the segment is disabled.
        type: boolean
        optional: true

    -   name: icon
        description: The icon of the segment.
        type: FluxIconName
        optional: true

    -   name: label
        description: The label of the segment.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the segment. Falls back to the icon and label.
---

# Segmented control item

The segmented control item represents an individual segment within the segmented control. Each item carries a `value`; selecting it updates the segmented control's `v-model` to that value. An item can render an icon, a label, or fully custom content.

::: render
render=../../code/components/segmented-control/item/preview.vue
:::

::: warning
This component is best used within a [Segmented control](../segmented-control).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic segmented control item.
example=../../code/components/segmented-control/item/basic.vue
:::

::: example Disabled || A segmented control with a disabled item.
example=../../code/components/segmented-control/item/disabled.vue
:::

::: example Icon only || Omit the `label` to render compact, icon-only segments.
example=../../code/components/segmented-control/item/icon-only.vue
:::

::: example Labels only || Omit the `icon` to render text-only segments.
example=../../code/components/segmented-control/item/labels-only.vue
:::

::: example Custom content || Use the default slot to render custom content such as an icon with a badge.
example=../../code/components/segmented-control/item/custom.vue
:::

## Used components

- [Icon](../icon)
