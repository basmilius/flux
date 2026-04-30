<template>
    <FluxKanban>
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

            <template #empty>
                Drop a card here.
            </template>
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
        {id: 1, columnId: 'todo', title: 'A lonely card'}
    ];

    function getCards(columnId: string) {
        return cards.filter(card => card.columnId === columnId);
    }
</script>
