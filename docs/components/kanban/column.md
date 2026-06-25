---
outline: deep

props:
    -   name: column-id
        description: Unique identifier for this column. Included in move events.
        type: [ string, number ]

    -   name: count
        description: A badge value displayed next to the label, typically the number of items. The badge renders even when the value is 0.
        type: [ string, number ]
        optional: true

    -   name: disabled
        description: Disables drag-and-drop for this column. Items inside cannot be picked up and the column refuses incoming drops.
        type: boolean
        optional: true
        default: 'false'

    -   name: icon
        description: An icon displayed before the column label.
        type: FluxIconName
        optional: true

    -   name: label
        description: Header label displayed at the top of the column.
        type: string

slots:
    -   name: default
        description: Item content — place FluxKanbanItem components here.

    -   name: actions
        description: Extra content rendered at the end of the column header (e.g. an add button).

    -   name: empty
        description: Shown inside the column body when there are no items.

    -   name: footer
        description: Rendered below the item list, useful for an inline "Add item" action.
---

# Kanban column

A single column inside a [`FluxKanban`](./) board. Each column has a unique `column-id` that is referenced by its child items and included in the `move` event when an item is dropped on it. The header shows the `label`, an optional `icon` and a `count` badge, and can be extended with the `actions` slot for things like a quick-add button. Use the `empty` slot for an empty-state message and the `footer` slot for inline actions like adding a new item.

::: render
render=../../code/components/kanban/column/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A column with a label and a couple of items.
example=../../code/components/kanban/column/basic.vue
:::

::: example Actions || Adding an action button to the column header via the `actions` slot.
example=../../code/components/kanban/column/actions.vue
:::

::: example Header || Adding an `icon` and a `count` badge to the column header.
example=../../code/components/kanban/column/header.vue
:::

::: example Empty state || Showing a message in the `empty` slot when no items are present.
example=../../code/components/kanban/column/empty.vue
:::

::: example Footer || An inline "Add item" button rendered through the `footer` slot.
example=../../code/components/kanban/column/footer.vue
:::

## Used components

- [Item](./item)
- [Kanban](./)
