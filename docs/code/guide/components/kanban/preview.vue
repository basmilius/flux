<template>
    <Preview>
        <FluxKanban style="max-width: 100%">
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
    </Preview>
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
        {id: 1, columnId: 'todo', title: 'Design system review'},
        {id: 2, columnId: 'todo', title: 'Write unit tests'},
        {id: 3, columnId: 'todo', title: 'Update documentation'},
        {id: 4, columnId: 'in-progress', title: 'Implement kanban component'},
        {id: 5, columnId: 'in-progress', title: 'Fix layout bug'},
        {id: 6, columnId: 'done', title: 'Set up project'},
        {id: 7, columnId: 'done', title: 'Create color palette'}
    ];

    function getCards(columnId: string) {
        return cards.filter(card => card.columnId === columnId);
    }
</script>
