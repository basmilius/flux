---
outline: deep

emits:
    -   name: move
        description: Triggered when a card is dragged to a new position or column.
        type: [ FluxKanbanMoveEvent ]

slots:
    -   name: default
        description: Place FluxKanbanColumn components here.
---

<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Kanban

A kanban board for organizing cards across draggable columns. Cards can be moved between columns and reordered within a column using drag and drop. The component is fully controlled — the parent is responsible for updating the data after a `move` event.

::: render
render=../../code/components/kanban/preview.vue
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

## Used components

- [Card](./card)
- [Column](./column)
- [Pane](../pane)
