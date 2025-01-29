---
outline: deep

props:
    -   name: is-horizontal
        description: Indicates that the items should flow horizontally.
        type: boolean
        optional: true
        
slots:
    -   name: default
        description: The content of the options group.
---

# Menu options

This component provides a container for grouping menu items that behave like options, allowing only one to be selected at a time. Its layout can be adjusted based on the `isHorizontal` prop. When set to horizontal, it applies a specific style; otherwise, it defaults to a vertical layout.

::: render
render=../../../code/guide/components/menu/options/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Alignment || Horizontal option menus can be used to allow users to select a variant.
example=../../../code/guide/components/menu/options/alignment.vue
:::

::: example Option || Vertical option menus can be used to allow the user to switch between different view modes.
example=../../../code/guide/components/menu/options/option.vue
:::
