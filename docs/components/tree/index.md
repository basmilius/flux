---
outline: deep

slots:
    -   name: default
        description: Root FluxTreeItem components.
---

# Tree

A readonly hierarchy with colored markers and connecting lines. Nest `FluxTreeItem` components to show parents, children and siblings. All items stay visible, and long labels wrap. The lines continue from the parent marker through the full height of its label.

The tree has no heading of its own. Place it inside a [description item](../description-list/item) when the surrounding content needs a label.

::: render
render=../../code/components/tree/preview.vue
:::

<FrontmatterDocs/>

## Accessibility

The hierarchy uses nested lists without buttons or additional tab stops. Markers and connecting lines are decorative. Use [Tree view](../tree-view) when users need to navigate or collapse a hierarchy.

## Examples

::: example Branches || Multiple children and root items, with lines that continue past sibling branches.
example=../../code/components/tree/branches.vue
:::

::: example Description list || The description item provides the label while the tree displays its value.
example=../../code/components/tree/description-list.vue
:::

::: example Custom label || Use the label slot for additional text.
example=../../code/components/tree/custom-label.vue
:::

## Used components

- [Tree item](./item)
