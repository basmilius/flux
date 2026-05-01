<template>
    <FluxKanban disabled>
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
    import { FluxKanban, FluxKanbanItem, FluxKanbanColumn } from '@flux-ui/components';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const cards = [
        {id: 1, columnId: 'todo', title: 'Read-only board'},
        {id: 2, columnId: 'in-progress', title: 'Cards cannot be picked up'},
        {id: 3, columnId: 'done', title: 'Useful for archived projects'}
    ];

    function getCards(columnId: string) {
        return cards.filter(card => card.columnId === columnId);
    }
</script>

<style scoped>
    .card {
        padding: 12px;
        background: var(--gray-25);
        border: 1px solid var(--gray-200);
        border-radius: var(--radius);
    }
</style>
