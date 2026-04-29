<template>
    <FluxKanban @move="onMove">
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
    import { ref } from 'vue';
    import { FluxKanban, FluxKanbanCard, FluxKanbanColumn } from '@flux-ui/components';
    import type { FluxKanbanMoveEvent } from '@flux-ui/types';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const cards = ref([
        {id: 1, columnId: 'todo', title: 'Design system review'},
        {id: 2, columnId: 'todo', title: 'Write unit tests'},
        {id: 3, columnId: 'todo', title: 'Update documentation'},
        {id: 4, columnId: 'in-progress', title: 'Implement kanban component'},
        {id: 5, columnId: 'in-progress', title: 'Fix layout bug'},
        {id: 6, columnId: 'done', title: 'Set up project'},
        {id: 7, columnId: 'done', title: 'Create color palette'}
    ]);

    function getCards(columnId: string) {
        return cards.value.filter(card => card.columnId === columnId);
    }

    function onMove({cardId, toColumnId, beforeCardId}: FluxKanbanMoveEvent): void {
        const movedCard = cards.value.find(card => card.id === cardId);

        if (!movedCard) {
            return;
        }

        const updated = cards.value.filter(card => card.id !== cardId);
        movedCard.columnId = String(toColumnId);

        if (beforeCardId === undefined) {
            updated.push(movedCard);
        } else {
            const beforeIndex = updated.findIndex(card => card.id === beforeCardId);
            updated.splice(beforeIndex === -1 ? updated.length : beforeIndex, 0, movedCard);
        }

        cards.value = updated;
    }
</script>
