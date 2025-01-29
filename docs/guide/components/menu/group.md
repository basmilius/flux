---
outline: deep

props:
    -   name: is-horizontal
        description: Indicates that the items should flow horizontally.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the group.
---

# Menu group

This component provides a container for grouping menu items, adjusting its orientation based on the `isHorizontal` prop. When set to horizontal, it applies a specific style; otherwise, it defaults to a vertical layout.

::: render
render=../../../code/guide/components/menu/group/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Vertical || Vertical groups are for combining menu items that share context.
example=../../../code/guide/components/menu/group/vertical.vue
:::

::: example Horizontal || Horizontal groups are perfect for menu items that together form a single state, such as the alignment of text.
example=../../../code/guide/components/menu/group/horizontal.vue
:::

::: example Separated || Groups can also be separated using a separator.
example=../../../code/guide/components/menu/group/separated.vue
:::

::: example Both || Menu's can also have both horizontal and vertical groups in them.
example=../../../code/guide/components/menu/group/both.vue
:::
