---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected segment changes.
        type: [ string, number ]

props:
    -   name: model-value
        description: The value of the selected segment.
        type: [ string, number ]
        optional: true

    -   name: aria-label
        description: The accessible label of the segmented control.
        type: string
        optional: true

    -   name: is-fill
        description: Allows the segmented control to fill in its parent.
        type: boolean
        optional: true

    -   name: size
        description: The size of the segmented control.
        type: FluxSize
        optional: true

slots:
    -   name: default
        description: The segments of the segmented control.
---

# Segmented control

This component is a UI element that allows users to choose between multiple options by selecting one of the multiple segments. Each segment is represented as a [Segmented control item](./item) with a distinct label and/or icon, and the currently selected segment is visually indicated by a highlighted background. It is commonly used in navigation, forms, or settings, providing a compact and intuitive way for users to make a choice.

The selected segment is bound through `v-model` and reflects the `value` of the active [Segmented control item](./item).

::: render
render=../../code/components/segmented-control/preview.vue
:::

::: tip
To switch between content areas based on the selected segment, use [Tabs](../tabs/).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic segmented control.
example=../../code/components/segmented-control/basic.vue
:::

::: example Icons || A segmented control with icons only.
example=../../code/components/segmented-control/icon.vue
:::

::: example With tabs || A segmented control driving the tab bar of [Tabs](../tabs/) to switch content.
example=../../code/components/segmented-control/tabs.vue
:::

::: example Sizes || A segmented control in all available sizes.
example=../../code/components/segmented-control/sizes.vue
:::

::: example Fill || A segmented control that fills its parent.
example=../../code/components/segmented-control/fill.vue
:::

::: example Disabled item || A segmented control with a single disabled segment.
example=../../code/components/segmented-control/disabled-item.vue
:::

::: example Disabled || A segmented control disabled in its entirety.
example=../../code/components/segmented-control/disabled.vue
:::

## Used components

- [Segmented control item](./item)
- [Icon](../icon)
