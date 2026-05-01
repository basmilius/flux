<template>
    <FluxKanban>
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

            <template #empty>
                Drop a card here.
            </template>
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
        {id: 1, columnId: 'todo', title: 'A lonely card'}
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
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }
</style>
