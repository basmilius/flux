---
outline: deep

props:
    -   name: aria-label
        description: Accessible label for the board, announced by screen readers.
        type: string
        optional: true

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
        description: Triggered when a card is dragged to a new position or column.
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

A kanban board for organizing cards across draggable columns. Cards can be moved between columns and reordered within a column using drag and drop, or with the keyboard. The component is fully controlled — the parent is responsible for updating the data after a `move` event.

::: render
render=../../code/components/kanban/preview.vue
:::

::: tip Keyboard support
Tab to a card, press <kbd>Space</kbd> or <kbd>Enter</kbd> to grab it, use the arrow keys to move, <kbd>Enter</kbd>/<kbd>Space</kbd> to drop and <kbd>Escape</kbd> to cancel.
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
            <FluxTableCell><code>cardId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The ID of the card that was moved.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>fromColumnId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The column the card originated from.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>toColumnId</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>The column the card was dropped into.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>beforeCardId</code></FluxTableCell>
            <FluxTableCell><code>string | number | undefined</code></FluxTableCell>
            <FluxTableCell>The card before which the moved card should be inserted. <code>undefined</code> means append at the end of the column.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Examples

::: example Basic || A task board with draggable cards.
example=../../code/components/kanban/basic.vue
:::

::: example Custom card || Using the default slot to render rich card content.
example=../../code/components/kanban/custom-card.vue
:::

::: example Disabled || A read-only board — drag-and-drop is disabled.
example=../../code/components/kanban/disabled.vue
:::

::: example Validation || Use `can-move` to reject specific drops.
example=../../code/components/kanban/validation.vue
:::

::: example Reorderable columns || Drag the column header to change column order.
example=../../code/components/kanban/reorder-columns.vue
:::

## Used components

- [Card](./card)
- [Column](./column)
- [Pane](../pane)
