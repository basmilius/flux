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

    -   name: disabled
        description: Disables the color select.
        type: boolean
        optional: true

requiredIcons:
    - check
    - ellipsis-h
---

# Color select

The color select lets users pick a color from a predefined set, or choose a custom color with the [Color picker](./picker) when `is-custom-allowed` is set.

::: render
render=../../code/components/color-select/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Simple || With this example, the user can select a color from a set of predefined colors.
example=../../code/components/color-select/simple.vue
:::

::: example Custom || In this example, the user can select a color from a predefined set of colors, or select a custom color.
example=../../code/components/color-select/custom.vue
:::

## Used components

- [Button](../button)
    - [Primary](../button/primary)
    - [Secondary](../button/secondary)
- Color
    - [Color picker](./picker)
- [Flyout](../flyout)
- [Icon](../icon)
- [Pane](../pane)
