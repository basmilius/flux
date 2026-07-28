<template>
    <FluxKanban>
        <FluxKanbanSwimlane
            v-for="lane in lanes"
            :key="lane.id"
            :swimlane-id="lane.id"
            :count="countCards(lane.id)"
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

    const columns = [
        {id: 'todo', label: 'To do'},
        {id: 'in-progress', label: 'In progress'},
        {id: 'done', label: 'Done'}
    ];

    const lanes = [
        {id: 'anna', label: 'Anna'},
        {id: 'bas', label: 'Bas'}
    ];

    const cards = [
        {id: 1, columnId: 'todo', laneId: 'anna', title: 'Design system review'},
        {id: 2, columnId: 'in-progress', laneId: 'anna', title: 'Fix layout bug'},
        {id: 3, columnId: 'todo', laneId: 'bas', title: 'Update documentation'},
        {id: 4, columnId: 'in-progress', laneId: 'bas', title: 'Implement kanban component'},
        {id: 5, columnId: 'done', laneId: 'bas', title: 'Set up project'}
    ];

    function getCards(columnId: string, laneId: string) {
        return cards.filter(card => card.columnId === columnId && card.laneId === laneId);
    }

    function countCards(laneId: string): number {
        return cards.filter(card => card.laneId === laneId).length;
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
