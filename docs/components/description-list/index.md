---
outline: deep

props:
    -   name: direction
        description: How the items flow. Use `vertical` to stack rows with the value aligned to the trailing edge, or `horizontal` to lay items out as columns separated by dividers.
        type: [ '"horizontal"', '"vertical"' ]
        optional: true
        default: vertical

    -   name: title
        description: An optional heading shown above the list.
        type: string
        optional: true

slots:
    -   name: default
        description: The label/value pairs, rendered as [Description item](./item) components.

    -   name: header
        description: Custom header content, replacing the title prop.
---

# Description list

The Description list component displays a set of label/value pairs, such as the fields of a record in a detail panel. It renders as a semantic `<dl>` with an optional heading, an optional leading icon per row, and the value aligned to the trailing edge. Values can be plain text, or richer content such as a badge, a copy action, or a link.

::: render
render=../../code/components/description-list/preview.vue
:::

::: tip
For a single icon and message, use [Info](../info) instead. The description list is meant for multiple label/value pairs.
:::

<FrontmatterDocs/>

## Examples

::: example Account || A profile panel with labels, icons, and a status badge.
example=../../code/components/description-list/account.vue
:::

::: example Order summary || An order panel with a copy action, a badge, and a stacked address.
example=../../code/components/description-list/order.vue
:::

::: example Columns || Items laid out as columns separated by dividers, using `direction="horizontal"`.
example=../../code/components/description-list/horizontal.vue
:::

## Used components

- [Description item](./item)
