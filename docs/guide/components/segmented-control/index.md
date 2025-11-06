---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected item changes.
        type: [ number ]

props:
    -   name: model-value
        description: The selected item index.
        type: number
        optional: true

    -   name: is-fill
        description: Allows the segmented control to fill in its parent.
        type: boolean
        optional: true

    -   name: items
        description: The items of the segmented control.
        type: FluxSegmentedControlItemObject[]
        optional: true
---

# Segmented control

This component is a UI element that allows users to choose between multiple options by selecting one of the multiple segments. Each segment is represented as a button with a distinct label, and the currently selected segment is visually indicated, for example, by a highlighted background. It is commonly used in navigation, forms, or settings, providing a compact and intuitive way for users to make a choice.

::: render
render=../../../code/guide/components/segmented-control/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic segmented control.
example=../../../code/guide/components/segmented-control/basic.vue
:::

::: example Icons || A segmented control with icons only.
example=../../../code/guide/components/segmented-control/icon.vue
:::

## Used components

- [Icon](../icon)
