---
outline: deep

emits:
    -   name: update:model-value
        description: The updated selected color.
        type: [ string ]

props:
    -   name: model-value
        description: The selected color.
        type: string
        optional: true

    -   name: colors
        description: The default set of colors that are shown as options.
        type: string[]
        optional: true

    -   name: is-custom-allowed
        description: If a custom color is allowed, the color picker is enabled and allows the user to select a custom color.
        type: boolean
        optional: true

requiredIcons:
    - ellipsis-h
---

# Color select

This component allows users to select a color from a predefined set or choose a custom color using a color picker. It includes visual indications for selected and unselected colors, and supports additional actions in a flyout pane for advanced color selection.

::: render
render=../../../code/guide/components/color-select/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Simple || With this example, the user can select a color from a set of predefined colors.
example=../../../code/guide/components/color-select/simple.vue
:::

::: example Custom || In this example, the user can select a color from a predefined set of colors, or select a custom color.
example=../../../code/guide/components/color-select/custom.vue
:::

## Used components

- [Button](../button)
    - [Primary](../button/primary)
    - [Secondary](../button/secondary)
- Color
    - [Color picker](../color/picker.md)
- [Flyout](../flyout)
- [Icon](../icon)
- [Pane](../pane)
