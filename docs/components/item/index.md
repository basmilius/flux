---
outline: deep

slots:
    -   name: default
        description: The content of the item, typically composed of item sub-components.
---

# Item

An item is a flexible list entry used to display structured content such as a media element, text, and actions. It is composed of several sub-components that each handle a specific area of the item.

::: render
render=../../code/components/item/preview.vue
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/components/item/preview.vue [FluxItem.vue]

:::

## Available sub-components

- [Content](./content)
- [Media](./media)
- [Actions](./actions)

## Used components

- [Stack](../layout/stack/index)
