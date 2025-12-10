---
outline: deep

emits:
    -   name: sort
        description: Triggered when the sorting type changes.
        type: [ 'ascending | descending | null' ]

props:
    -   name: is-shrinking
        description: If the header will shrink to fit its cell group.
        type: boolean
        optional: true
        
    -   name: is-sortable
        description: If the table header will render a sorting flyout.
        type: boolean
        optional: true
        
    -   name: is-sticky
        description: If the table header will stick to the top of the table.
        type: boolean
        optional: true
        
    -   name: min-width
        description: The minimal width of the cell group.
        type: number
        optional: true
        default: 0
        
    -   name: sort
        description: The current sorting that is applied to the header.
        type: [ '"ascending"', '"descending"' ]
        optional: true

slots:
    -   name: default
        description: The content of the header.

requiredIcons:
    - arrow-down-a-z
    - arrow-up-a-z
    - arrow-up-arrow-down
    - circle-xmark
---

# Table header

The table header defines the label for a column within the table. It helps users understand the meaning of the data below it and provides structure and clarity to the table’s content.

::: render
render=../../../code/guide/components/table/header/preview.vue
:::

::: warning
This component is best used within a [Table](../table).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table header.
example=../../../code/guide/components/table/header/basic.vue
:::

::: example Shrinking || A table header that shrinks to fit its cell group.
example=../../../code/guide/components/table/header/shrinking.vue
:::

::: example Sortable || A table header that can be sorted.
example=../../../code/guide/components/table/header/sortable.vue
:::

::: example Width || A table header with a custom width.
example=../../../code/guide/components/table/header/width.vue
:::

## Used components

- [Flyout](../flyout)
- [Icon](../icon)
- [Separator](../separator)
- [Menu](../menu)
    - [Item](../menu/item)
    - [Group](../menu/group)
