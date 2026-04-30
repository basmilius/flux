---
outline: deep

props:
    -   name: column-id
        description: Unique identifier for this column. Included in move events.
        type: [ string, number ]

    -   name: disabled
        description: Disables drag-and-drop for this column. Cards inside cannot be picked up and the column refuses incoming drops.
        type: boolean
        optional: true
        default: 'false'

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

    -   name: empty
        description: Shown inside the column body when there are no cards.

    -   name: footer
        description: Rendered below the card list, useful for an inline "Add card" action.
---

# Kanban column

A single column inside a [`FluxKanban`](./) board. Each column has a unique `column-id` that is referenced by its child cards and included in the `move` event when a card is dropped on it. The header can be replaced via the `header` slot or extended with the `actions` slot for things like a quick-add button. Use the `empty` slot for an empty-state message and the `footer` slot for inline actions like adding a new card.

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

::: example Empty state || Showing a message in the `empty` slot when no cards are present.
example=../../code/components/kanban/column/empty.vue
:::

::: example Footer || An inline "Add card" button rendered through the `footer` slot.
example=../../code/components/kanban/column/footer.vue
:::

## Used components

- [Card](./card)
- [Kanban](./)
