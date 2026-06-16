---
outline: deep

props:
    -   name: icon
        description: An optional leading icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: is-stacked
        description: Stacks the label on top of the value instead of placing them side by side. Useful for long values within a vertical list.
        type: boolean
        optional: true

    -   name: label
        description: The label of the pair, rendered as the term (`<dt>`).
        type: string
        optional: true

slots:
    -   name: default
        description: The value of the pair, rendered as the description (`<dd>`). May contain rich content such as a badge, a copy action, or a link.

    -   name: label
        description: Replaces the label prop with custom content.
---

# Description item

The Description item component represents a single label/value pair within a [Description list](./). The label is rendered as a `<dt>` with an optional leading icon, and the value, provided through the default slot, as a `<dd>` aligned to the trailing edge.

::: render
render=../../code/components/description-list/item/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A description item with an icon and a rich value.
example=../../code/components/description-list/item/basic.vue
:::

## Used components

- [Description list](./)
