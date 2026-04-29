---
outline: deep

props:
    -   name: column-id
        description: Unique identifier for this column. Included in move events.
        type: [ string, number ]

    -   name: label
        description: Header label displayed at the top of the column.
        type: string

slots:
    -   name: default
        description: Card content — place FluxKanbanCard components here.

    -   name: header
        description: Replaces the default label with a custom header.

    -   name: actions
        description: Extra content rendered at the end of the column header (e.g. an add button).
---

# Kanban column

A single column inside a [`FluxKanban`](./) board. Each column has a unique `column-id` that is referenced by its child cards and included in the `move` event when a card is dropped on it. The header can be replaced via the `header` slot or extended with the `actions` slot for things like a quick-add button.

::: render
render=../../code/components/kanban/column/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A column with a label and a couple of cards.
example=../../code/components/kanban/column/basic.vue
:::

::: example Actions || Adding an action button to the column header via the `actions` slot.
example=../../code/components/kanban/column/actions.vue
:::

::: example Custom header || Replacing the default label with a fully custom header.
example=../../code/components/kanban/column/custom-header.vue
:::

## Used components

- [Card](./card)
- [Kanban](./)
