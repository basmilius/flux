<template>
    <FluxKanban @move="onMove">
        <FluxKanbanSwimlane
            v-for="lane in lanes"
            :key="lane.id"
            :swimlane-id="lane.id"
            :label="lane.label">
            <FluxKanbanColumn
                v-for="column in columns"
                :key="column.id"
                :column-id="column.id"
                :label="column.label">
                <FluxKanbanItem
                    v-for="card in getCards(column.id, lane.id)"
                    :key="card.id"
                    :item-id="card.id"
                    :column-id="column.id">
                    <div class="card">
                        {{ card.title }}
                    </div>
                </FluxKanbanItem>
            </FluxKanbanColumn>
        </FluxKanbanSwimlane>
    </FluxKanban>
</template>

<script
    lang="ts"
    setup>
    import { FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxKanbanSwimlane } from '@flux-ui/components';
    import type { FluxKanbanSwimlaneMoveEvent } from '@flux-ui/types';
    import { ref } from 'vue';

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const lanes = [
        {id: 'anna', label: 'Anna'},
        {id: 'bas', label: 'Bas'}
    ];

    const cards = ref([
        {id: 1, columnId: 'todo', laneId: 'anna', title: 'Design system review'},
        {id: 2, columnId: 'todo', laneId: 'anna', title: 'Write unit tests'},
        {id: 3, columnId: 'in-progress', laneId: 'anna', title: 'Fix layout bug'},
        {id: 4, columnId: 'todo', laneId: 'bas', title: 'Update documentation'},
        {id: 5, columnId: 'in-progress', laneId: 'bas', title: 'Implement kanban component'},
        {id: 6, columnId: 'done', laneId: 'bas', title: 'Set up project'}
    ]);

    function getCards(columnId: string, laneId: string) {
        return cards.value.filter(card => card.columnId === columnId && card.laneId === laneId);
    }

    function onMove({itemId, toColumnId, toSwimlaneId, beforeItemId}: FluxKanbanSwimlaneMoveEvent): void {
        const movedCard = cards.value.find(card => card.id === itemId);

        if (!movedCard) {
            return;
        }

        const updated = cards.value.filter(card => card.id !== itemId);
        movedCard.columnId = String(toColumnId);
        movedCard.laneId = String(toSwimlaneId);

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
        background: var(--surface);
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
        transition: box-shadow 180ms var(--swift-out);
    }

    .card:hover {
        box-shadow: 0 1px 4px rgb(0 0 0 / .08);
    }
</style>
