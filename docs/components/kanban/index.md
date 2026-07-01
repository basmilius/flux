---
outline: deep

props:
    -   name: can-move
        description: Optional validator. Return false to reject a drop. Called for both pointer and keyboard moves.
        type: '(event: FluxKanbanMoveEvent) => boolean'
        optional: true

    -   name: disabled
        description: Disables drag-and-drop on the entire board.
        type: boolean
        optional: true
        default: 'false'

    -   name: reorderable-columns
        description: Allows columns to be reordered by dragging their header.
        type: boolean
        optional: true
        default: 'false'

emits:
    -   name: move
        description: Triggered when an item is dragged to a new position or column.
        type: [ FluxKanbanMoveEvent ]

    -   name: move-column
        description: Triggered when a column is reordered. Only fires when reorderable-columns is enabled.
        type: [ FluxKanbanMoveColumnEvent ]

slots:
    -   name: default
        description: Place FluxKanbanColumn components here.
---

<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Kanban

A kanban board for organizing items across draggable columns. Items can be moved between columns and reordered within a column using drag and drop, or with the keyboard. The component is fully controlled. The parent is responsible for updating the data after a `move` event.

::: render
render=../../code/components/kanban/preview.vue
:::

::: tip Keyboard support
Tab to an item, press <kbd>Space</kbd> or <kbd>Enter</kbd> to grab it, use the arrow keys to move, <kbd>Enter</kbd>/<kbd>Space</kbd> to drop and <kbd>Escape</kbd> to cancel.

When `reorderable-columns` is enabled, Tab to a column header and use <kbd>←</kbd>/<kbd>→</kbd> to move the column left or right.
:::

<FrontmatterDocs/>

## Move event

The `move` event contains everything needed to update the data:

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Property</FluxTableHeader>
                <FluxTableHeader>Type</FluxTableHeader>
                <FluxTableHeader>Description</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><code>itemId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The ID of the item that was moved.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>fromColumnId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The column the item originated from.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>toColumnId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The column the item was dropped into.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>beforeItemId</code></FluxTableCell>
            <FluxTableCell><code>string | number | undefined</code></FluxTableCell>
            <FluxTableCell>The item before which the moved item should be inserted. <code>undefined</code> means append at the end of the column.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Examples

::: example Basic || A task board with draggable items.
example=../../code/components/kanban/basic.vue
:::

::: example Custom item || Using the default slot to render rich item content.
example=../../code/components/kanban/custom-item.vue
:::

::: example Disabled || A read-only board. Drag-and-drop is disabled.
example=../../code/components/kanban/disabled.vue
:::

::: example Validation || Use `can-move` to reject specific drops.
example=../../code/components/kanban/validation.vue
:::

::: example Reorderable columns || Drag a column header (or focus it and press the left/right arrow keys) to change column order.
example=../../code/components/kanban/reorder-columns.vue
:::

## Used components

- [Column](./column)
- [Item](./item)
- [Pane](../pane)
