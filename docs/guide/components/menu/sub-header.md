---
outline: deep

props:
    -   name: icon-leading
        description: Icon at the start of the sub header.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: Icon at the end of the sub header.
        type: FluxIconName
        optional: true

    -   name: label
        description: Label of the sub header.
        type: string
---

# Menu sub header

This component is used for creating subheaders within menus. It can display an optional icon before and after the label, making it easy to visually separate different sections of a menu.

The label text is prominently displayed, and the subheader plays a role in organizing menu items into more digestible and structured sections. This component helps enhance the readability and usability of complex menus by providing clear visual breaks.

::: render
render=../../../code/guide/components/menu/sub-header/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Grouped
example=../../../code/guide/components/menu/sub-header/grouped.vue
:::

## Used components

- [Icon](../icon)
