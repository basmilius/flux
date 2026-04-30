<template>
    <FluxKanban disabled>
        <FluxKanbanColumn
            v-for="column in columns"
            :key="column.id"
            :column-id="column.id"
            :label="column.label">
            <FluxKanbanCard
                v-for="card in getCards(column.id)"
                :key="card.id"
                :card-id="card.id"
                :column-id="column.id">
                {{ card.title }}
            </FluxKanbanCard>
        </FluxKanbanColumn>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';

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
