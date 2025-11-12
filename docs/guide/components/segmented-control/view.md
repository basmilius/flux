---
outline: deep

props:
    -   name: index
        description: The current active segment index.
        type: number

slots:
    -   name: default
        description: The content of the segmented view.
---

# Segmented view

The segmented view displays the content associated with the currently selected segment of a segmented control. When a user switches segments, the segmented view updates to show the relevant section while hiding the others. This allows multiple related views to share the same space in the interface, keeping the layout clean and focused while providing quick, seamless transitions between content areas.

::: render
render=../../../code/guide/components/segmented-control/view/preview.vue
:::

::: warning
This component is best used within a [Segmented control](../segmented-control).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic segmented control.
example=../../../code/guide/components/segmented-control/view/basic.vue
:::

::: example Icons || A segmented control with icons only.
example=../../../code/guide/components/segmented-control/view/icon.vue
:::
