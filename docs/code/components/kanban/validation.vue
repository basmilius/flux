<template>
    <FluxKanban
        :can-move="canMove"
        @move="onMove">
        <FluxKanbanColumn
            v-for="column in columns"
            :key="column.id"
            :column-id="column.id"
            :label="column.label">
            <FluxKanbanItem
                v-for="card in getCards(column.id)"
                :key="card.id"
                :item-id="card.id"
                :column-id="column.id">
                <div class="card">
                    {{ card.title }}
                </div>
            </FluxKanbanItem>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue';
    import { FluxKanban, FluxKanbanItem, FluxKanbanColumn } from '@flux-ui/components';
    import type { FluxKanbanMoveEvent } from '@flux-ui/types';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const cards = ref([
        {id: 1, columnId: 'todo', title: 'Plan sprint'},
        {id: 2, columnId: 'todo', title: 'Refine backlog'},
        {id: 3, columnId: 'in-progress', title: 'Build kanban'},
        {id: 4, columnId: 'done', title: 'Setup project'}
    ]);

    function getCards(columnId: string) {
        return cards.value.filter(card => card.columnId === columnId);
    }

    // Disallow moving cards directly from "todo" to "done". They have to pass through "in-progress" first.
    function canMove({fromColumnId, toColumnId}: FluxKanbanMoveEvent): boolean {
        return !(fromColumnId === 'todo' && toColumnId === 'done');
    }

    function onMove({itemId, toColumnId, beforeItemId}: FluxKanbanMoveEvent): void {
        const movedCard = cards.value.find(card => card.id === itemId);

        if (!movedCard) {
            return;
        }

        const updated = cards.value.filter(card => card.id !== itemId);
        movedCard.columnId = String(toColumnId);

        if (beforeItemId === undefined) {
            updated.push(movedCard);
        } else {
            const beforeIndex = updated.findIndex(card => card.id === beforeItemId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, movedCard);
        }

        cards.value = updated;
    }
</script>

<style scoped>
    .card {
        padding: 12px;
        background: var(--gray-25);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }
</style>
